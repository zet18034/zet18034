/* kit/deck.js — 슬라이드 기반 엔진 (2026-11-18)
   무대 맞춤 · 장 이동(키·클릭·밀기·해시) · 단계 등장 · 장 전환 · 숫자 세기/글자 하나씩 · 이벤트.
   쓰는 법은 kit/README.md. 덱 HTML 끝에 <script src="../kit/deck.js"></script> 한 줄. */
(() => {
  'use strict';
  const W = 1920, H = 1080;
  const deckEl = document.querySelector('.deck');
  if (!deckEl) return;
  const root = document.documentElement;
  const slides = [...deckEl.children].filter(e => e.classList.contains('slide'));
  if (!slides.length) return;
  const motionMq = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => motionMq.matches;
  const canVT = typeof document.startViewTransition === 'function';
  if (canVT) deckEl.classList.add('vt');
  const emit = (target, type, detail) => target.dispatchEvent(new CustomEvent(type, { bubbles: true, detail }));

  /* ── data-hue: 그 요소 안에서만 기준 색상 바꾸기 ── */
  deckEl.querySelectorAll('[data-hue]').forEach(e => e.style.setProperty('--deck-hue', e.dataset.hue));

  /* ── 캔버스 모드: 장에 data-x·data-y(장 가운데 좌표), data-scale(크기), data-rotate(도)가 있으면
     장들을 큰 캔버스 위에 배치하고 카메라가 날아가며 확대·축소·회전한다. data-overview 장 = 전체 보기 ── */
  const isCanvas = slides.some(s => s.hasAttribute('data-x') || s.hasAttribute('data-y'));
  const posOf = s => ({ x: +(s.dataset.x || 0), y: +(s.dataset.y || 0), s: +(s.dataset.scale || 1), r: +(s.dataset.rotate || 0) });
  let canvasEl = null, camNow = null, camRaf = 0, overviewKey = false;
  const placed = () => slides.filter(s => !s.hasAttribute('data-overview'));
  const camApply = c => { canvasEl.style.transform = `translate(${W / 2}px, ${H / 2}px) scale(${1 / c.s}) rotate(${-c.r}deg) translate(${-c.x}px, ${-c.y}px)`; };
  const overviewCam = () => {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    placed().forEach(s => {
      const p = posOf(s), a = p.r * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a);
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([u, v]) => {
        const lx = u * W / 2 * p.s, ly = v * H / 2 * p.s;
        const X = p.x + lx * cs - ly * sn, Y = p.y + lx * sn + ly * cs;
        x0 = Math.min(x0, X); x1 = Math.max(x1, X); y0 = Math.min(y0, Y); y1 = Math.max(y1, Y);
      });
    });
    return { x: (x0 + x1) / 2, y: (y0 + y1) / 2, s: Math.max((x1 - x0) / W, (y1 - y0) / H) * 1.08, r: 0 };
  };
  /* 카메라 이동: 크기는 로그로 보간(확대가 고르게 느껴지게), 멀리 갈 때는 잠깐 물러났다 다가간다 */
  const camTo = (t, instant) => {
    cancelAnimationFrame(camRaf);
    if (!camNow || instant || reduced()) { camNow = t; camApply(t); return; }
    const f = { ...camNow }, t0 = performance.now();
    const dur = (parseFloat(getComputedStyle(deckEl).getPropertyValue('--move-dur')) || 1.1) * 1000;
    const dist = Math.hypot(t.x - f.x, t.y - f.y), base = Math.max(f.s, t.s);
    const dip = 1 + Math.max(0, dist / (W * base) - .4) * .7;
    let dr = t.r - f.r; dr = ((dr + 540) % 360) - 180;   // 짧은 쪽으로 돌기
    const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const tick = now => {
      const k = Math.min((now - t0) / dur, 1), e = ease(k);
      const ls = Math.log(f.s) + (Math.log(t.s) - Math.log(f.s)) * e;
      camNow = { x: f.x + (t.x - f.x) * e, y: f.y + (t.y - f.y) * e, r: f.r + dr * e, s: Math.exp(ls) * Math.pow(dip, Math.sin(Math.PI * e)) };
      camApply(camNow);
      if (k < 1) camRaf = requestAnimationFrame(tick); else { camNow = t; camApply(t); }
    };
    camRaf = requestAnimationFrame(tick);
  };
  if (isCanvas) {
    deckEl.classList.add('canvas'); deckEl.classList.remove('vt');
    canvasEl = document.createElement('div');
    canvasEl.className = 'deck-canvas';
    slides.forEach(s => {
      canvasEl.appendChild(s);
      const p = posOf(s);
      s.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg) scale(${p.s}) translate(${-W / 2}px, ${-H / 2}px)`;
    });
    deckEl.prepend(canvasEl);
  }

  /* ── 단계 번호 정리: "+"·빈 값 = 앞 단계+1, "=" = 앞 단계와 같이 ── */
  const STEP_SEL = '[data-step],[data-step-off]';
  const plan = new Map();   // slide -> { items:[{el,on,off}], max }
  slides.forEach(s => {
    let last = 0, max = 0;
    const items = [...s.querySelectorAll(STEP_SEL)].map(el => {
      let on = 0, off = Infinity;
      if (el.hasAttribute('data-step')) {
        const v = el.dataset.step.trim();
        on = (v === '' || v === '+') ? last + 1 : v === '=' ? Math.max(last, 1) : parseInt(v, 10);
        if (!(on >= 0)) on = last + 1;
        last = on;
        el.dataset.step = on;
      }
      if (el.hasAttribute('data-step-off')) {
        const o = parseInt(el.dataset.stepOff, 10);
        if (o > 0) off = o;
      }
      max = Math.max(max, on, off === Infinity ? 0 : off);
      return { el, on, off };
    });
    plan.set(s, { items, max });
  });
  const maxOf = s => plan.get(s).max;

  /* ── 글자 하나씩(data-split): 낱자를 span으로. 낱말은 묶어서 줄바꿈이 어절 단위로 되게 ── */
  deckEl.querySelectorAll('[data-split]').forEach(q => {
    q.classList.add('split');
    q.setAttribute('aria-label', q.textContent.replace(/\s+/g, ' ').trim());
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 1) { if (n.tagName !== 'BR') { n.setAttribute('aria-hidden', 'true'); walk(n); } return; }
        if (n.nodeType !== 3) return;
        const frag = document.createDocumentFragment();
        n.data.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
          [...part].forEach(ch => { const c = document.createElement('span'); c.className = 'c'; c.textContent = ch; c.style.setProperty('--i', i++); w.appendChild(c); });
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      });
    };
    walk(q);
  });

  /* ── 효과(숫자 세기·글자 하나씩): 가장 가까운 단계 요소가 켜질 때 실행, 단계 밖이면 장에 들어올 때 ── */
  const FX_SEL = '[data-count],[data-split]';
  const fxOwner = new Map();   // 효과 요소 -> 단계 요소(없으면 slide)
  slides.forEach(s => s.querySelectorAll(FX_SEL).forEach(e => {
    const o = e.closest(STEP_SEL);
    fxOwner.set(e, o && s.contains(o) ? o : s);
  }));
  const fxOf = owner => [...fxOwner].filter(([, o]) => o === owner).map(([e]) => e);
  const fmt = (e, v) => {
    const d = +(e.dataset.countDec || 0);
    return v.toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: e.dataset.countGroup !== 'off' });
  };
  const fxReset = e => {
    if (e.hasAttribute('data-count')) { cancelAnimationFrame(e._raf); e.textContent = fmt(e, +(e.dataset.countFrom || 0)); }
    if (e.classList.contains('split')) e.classList.remove('play');
  };
  const fxPlay = (e, animate) => {
    if (e.hasAttribute('data-count')) {
      const from = +(e.dataset.countFrom || 0), end = +e.dataset.count, dur = +(e.dataset.countDur || 1000);
      cancelAnimationFrame(e._raf);
      if (!animate || reduced()) { e.textContent = fmt(e, end); }
      else {
        const t0 = performance.now() + 200;
        const tick = now => {
          const p = Math.max(0, Math.min((now - t0) / dur, 1));
          e.textContent = fmt(e, from + (end - from) * (1 - Math.pow(1 - p, 3)));
          if (p < 1) e._raf = requestAnimationFrame(tick);
        };
        e.textContent = fmt(e, from); e._raf = requestAnimationFrame(tick);
      }
    }
    if (e.classList.contains('split')) e.classList.add('play');
  };
  fxOwner.forEach((_, e) => fxReset(e));

  /* ── 쪽 번호·남은 단계 점 ── */
  const chrome = document.createElement('div');
  chrome.className = 'deck-chrome';
  chrome.innerHTML = '<span class="deck-dots" aria-hidden="true"></span><span class="deck-page" aria-live="polite"></span>';
  deckEl.appendChild(chrome);
  const dotsEl = chrome.firstChild, pageEl = chrome.lastChild;

  /* ── 상태 ── */
  let cur = -1, step = 0, shown = -1;

  const applySteps = (s, n, fresh) => {
    for (const { el, on, off } of plan.get(s).items) {
      const vis = n >= on && n < off, was = el.classList.contains('on');
      if (vis === was) continue;
      el.classList.toggle('on', vis);
      if (vis) el.removeAttribute('aria-hidden'); else el.setAttribute('aria-hidden', 'true');
      fxOf(el).forEach(e => vis ? fxPlay(e, fresh) : fxReset(e));
      emit(el, vis ? 'step:on' : 'step:off', { fresh, step: n });
    }
  };

  const updateUi = () => {
    const s = slides[cur], mx = maxOf(s);
    if (dotsEl.childElementCount !== mx) dotsEl.innerHTML = '<i></i>'.repeat(mx);
    [...dotsEl.children].forEach((d, i) => d.classList.toggle('on', i < step));
    pageEl.textContent = `${cur + 1} / ${slides.length}`;
    try { history.replaceState(null, '', '#s' + (cur + 1) + (step ? '.' + step : '')); } catch (e) {}
    emit(deckEl, 'deck:change', { index: cur, step, max: mx, slide: s });
  };

  /* 화면을 상태(cur, step)에 맞춘다. 전환 콜백이 겹쳐 불려도 같은 결과가 되게 짠다 */
  const render = instant => {
    const s = slides[cur];
    if (shown !== cur) {
      const old = slides[shown];
      if (old) { old.classList.remove('active'); old.inert = true; emit(old, 'slide:leave', { index: shown }); }
      /* 들어오는 장의 단계는 움직임 없이 먼저 맞춘다(전에 켜 둔 단계가 사라지는 모습이 보이지 않게) */
      deckEl.classList.add('no-anim');
      s.classList.add('active'); s.inert = false;
      shown = cur;
      deckEl.dataset.index = cur + 1;
      deckEl.dataset.at = s.id || '';
      deckEl.classList.toggle('is-first', cur === 0);
      deckEl.classList.toggle('is-last', cur === slides.length - 1);
      deckEl.classList.toggle('hide-chrome', s.hasAttribute('data-hide-chrome'));
      const tone = s.dataset.tone || deckEl.dataset.tone;
      if (tone) chrome.dataset.tone = tone; else delete chrome.dataset.tone;
      if (s.dataset.hue) chrome.style.setProperty('--deck-hue', s.dataset.hue); else chrome.style.removeProperty('--deck-hue');
      applySteps(s, step, false);
      void deckEl.offsetWidth;
      deckEl.classList.remove('no-anim');
      fxOf(s).forEach(e => { fxReset(e); void e.offsetWidth; fxPlay(e, !instant); });
      emit(s, 'slide:enter', { index: cur, step });
    } else {
      applySteps(s, step, !instant);
    }
    updateUi();
  };

  /* 캔버스 모드에서 카메라·전체 보기 상태를 맞춘다 */
  const syncView = instantCam => {
    if (!isCanvas) return;
    const ov = overviewKey || slides[cur].hasAttribute('data-overview');
    deckEl.classList.toggle('overview', ov);
    slides.forEach(s => { s.inert = ov ? false : s !== slides[cur]; });
    camTo(ov ? overviewCam() : posOf(slides[cur]), instantCam);
  };

  let vtToken = 0;
  const go = (n, target = 0) => {
    n = Math.max(0, Math.min(slides.length - 1, n | 0));
    const s = slides[n], mx = maxOf(s);
    const st = target === 'end' ? mx : Math.max(0, Math.min(mx, target | 0));
    if (n === cur) { step = st; render(false); syncView(false); return; }
    const dir = n > cur ? 'next' : 'prev', first = cur < 0;
    cur = n; step = st;
    const instant = first || st > 0;
    if (isCanvas) { render(instant); syncView(first); return; }
    const type = s.dataset.transition || deckEl.dataset.transition || 'fade';
    if (canVT && !first && !reduced() && type !== 'none' && !document.hidden) {
      const my = ++vtToken;
      root.dataset.vt = type; root.dataset.vtDir = dir;
      const vt = document.startViewTransition(() => render(instant));
      vt.finished.finally(() => { if (my === vtToken) { delete root.dataset.vt; delete root.dataset.vtDir; } });
    } else render(instant);
  };
  /* ── 갈림길 ──
     data-go="id|번호": 누르면 그 장으로(돌아올 자리를 기억). data-back: 기억한 자리로.
     장의 data-next="id|번호|back": 마지막 단계에서 넘기면 갈 곳. 갈림길로 들어온 장에서 ←는 온 자리로. */
  const findSlide = ref => {
    if (ref == null || ref === '') return -1;
    if (/^\d+$/.test(ref)) return Math.min(slides.length, +ref) - 1;
    const el = document.getElementById(ref);
    return el ? slides.indexOf(el.closest('.slide')) : -1;
  };
  const backStack = [], cameFrom = new Map();
  const jump = (ref, remember) => {
    const i = findSlide(ref);
    if (i < 0) return false;
    if (remember) backStack.push([cur, step]);
    cameFrom.set(i, [cur, step]);
    go(i, 0);
    return true;
  };
  const back = () => {
    const p = backStack.pop();
    if (!p) return false;
    cameFrom.delete(cur);
    go(p[0], p[1]);
    return true;
  };
  const leaveOverview = () => { if (!overviewKey) return false; overviewKey = false; syncView(false); return true; };
  const next = () => {
    if (leaveOverview()) return;
    const s = slides[cur];
    if (step < maxOf(s)) { step++; render(false); return; }
    const to = s.dataset.next;
    if (to === 'back' ? back() : jump(to, false)) return;
    if (cur < slides.length - 1) { cameFrom.delete(cur + 1); go(cur + 1, 0); }
  };
  const prev = () => {
    if (leaveOverview()) return;
    if (step > 0) { step--; render(false); return; }
    if (cameFrom.has(cur)) { const [i, st] = cameFrom.get(cur); cameFrom.delete(cur); go(i, st); return; }
    if (cur > 0) go(cur - 1, 'end');
  };
  const toggleOverview = on => { if (!isCanvas) return; overviewKey = on ?? !overviewKey; syncView(false); };

  /* ── 무대 맞춤 ── */
  const fit = () => {
    const vw = innerWidth, vh = innerHeight, k = Math.min(vw / W, vh / H);
    deckEl.style.transform = `translate(${(vw - W * k) / 2}px, ${(vh - H * k) / 2}px) scale(${k})`;
    deckEl.style.setProperty('--deck-scale', k);
    emit(deckEl, 'deck:resize', { scale: k });
  };
  addEventListener('resize', fit);
  fit();

  /* ── 조작 ── */
  const editable = t => t instanceof Element && t.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
  addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || editable(e.target)) return;
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); go(0, 0); }
    else if (k === 'End') { e.preventDefault(); go(slides.length - 1, 'end'); }
    else if ((k === 'o' || k === 'O') && isCanvas) { e.preventDefault(); toggleOverview(); }
    else if (k === 'Escape' && overviewKey) { e.preventDefault(); toggleOverview(false); }
    else if (k === 'f' || k === 'F') {
      if (!document.fullscreenElement) Promise.resolve(root.requestFullscreen && root.requestFullscreen()).catch(() => {});
      else if (document.exitFullscreen) document.exitFullscreen();
    }
  });
  /* 클릭: 화면 왼쪽 1/3은 뒤로, 나머지는 앞으로. 버튼·링크·입력칸·data-no-nav 안의 클릭은 넘기지 않는다 */
  const NO_NAV = 'a, button, input, textarea, select, label, summary, details, video, audio, iframe, [contenteditable], [role="button"], [data-no-nav]';
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0) return;
    const t = e.target instanceof Element ? e.target : null;
    /* 전체 보기에서 장을 누르면 그 장으로 */
    if (t && deckEl.classList.contains('overview')) {
      const s = t.closest('.slide');
      if (s && !s.hasAttribute('data-overview')) { overviewKey = false; const i = slides.indexOf(s); if (i !== cur) cameFrom.set(i, [cur, step]); go(i, 0); return; }
    }
    const g = t && t.closest('[data-go],[data-back]');
    if (g) { e.preventDefault(); g.hasAttribute('data-back') ? back() : jump(g.dataset.go, true); return; }
    if (t && t.closest(NO_NAV)) return;
    if (String(getSelection && getSelection())) return;
    (e.clientX < innerWidth / 3 ? prev : next)();
  });
  let t0 = null;
  addEventListener('touchstart', e => { t0 = e.touches.length === 1 && !(e.target instanceof Element && e.target.closest('[data-no-nav]')) ? [e.touches[0].clientX, e.touches[0].clientY] : null; }, { passive: true });
  addEventListener('touchend', e => {
    if (!t0) return;
    const dx = e.changedTouches[0].clientX - t0[0], dy = e.changedTouches[0].clientY - t0[1];
    t0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
  });

  /* ── 해시: #s3 = 3장, #s3.2 = 3장 2단계까지 ── */
  const fromHash = () => {
    const m = /^#s(\d+)(?:\.(\d+))?$/.exec(location.hash);
    return m ? [+m[1] - 1, m[2] ? +m[2] : 0] : [0, 0];
  };
  addEventListener('hashchange', () => { const [n, st] = fromHash(); if (n !== cur || st !== step) go(n, st); });

  /* ── 다른 스크립트에서 쓰는 손잡이 ── */
  window.deck = {
    el: deckEl, slides,
    get index() { return cur; },
    get step() { return step; },
    get max() { return maxOf(slides[cur]); },
    next, prev, back,
    go: (index, stepN = 0) => go(index, stepN),
    jump: (ref, remember = true) => jump(ref, remember),
    overview: on => toggleOverview(on),
    on: (type, fn) => deckEl.addEventListener(type, fn),
  };

  slides.forEach(s => { s.inert = true; });
  const [n0, s0] = fromHash();
  go(n0, s0);
  deckEl.classList.add('ready');
  emit(deckEl, 'deck:ready', { slides: slides.length });
})();
