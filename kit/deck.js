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

  let vtToken = 0;
  const go = (n, target = 0) => {
    n = Math.max(0, Math.min(slides.length - 1, n | 0));
    const s = slides[n], mx = maxOf(s);
    const st = target === 'end' ? mx : Math.max(0, Math.min(mx, target | 0));
    if (n === cur) { step = st; render(false); return; }
    const dir = n > cur ? 'next' : 'prev', first = cur < 0;
    cur = n; step = st;
    const instant = first || st > 0;
    const type = s.dataset.transition || deckEl.dataset.transition || 'fade';
    if (canVT && !first && !reduced() && type !== 'none' && !document.hidden) {
      const my = ++vtToken;
      root.dataset.vt = type; root.dataset.vtDir = dir;
      const vt = document.startViewTransition(() => render(instant));
      vt.finished.finally(() => { if (my === vtToken) { delete root.dataset.vt; delete root.dataset.vtDir; } });
    } else render(instant);
  };
  const next = () => {
    const s = slides[cur];
    if (step < maxOf(s)) { step++; render(false); }
    else if (cur < slides.length - 1) go(cur + 1, 0);
  };
  const prev = () => {
    if (step > 0) { step--; render(false); }
    else if (cur > 0) go(cur - 1, 'end');
  };

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
    else if (k === 'f' || k === 'F') {
      if (!document.fullscreenElement) Promise.resolve(root.requestFullscreen && root.requestFullscreen()).catch(() => {});
      else if (document.exitFullscreen) document.exitFullscreen();
    }
  });
  /* 클릭: 화면 왼쪽 1/3은 뒤로, 나머지는 앞으로. 버튼·링크·입력칸·data-no-nav 안의 클릭은 넘기지 않는다 */
  const NO_NAV = 'a, button, input, textarea, select, label, summary, details, video, audio, iframe, [contenteditable], [role="button"], [data-no-nav]';
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.target instanceof Element && e.target.closest(NO_NAV)) return;
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
    next, prev,
    go: (index, stepN = 0) => go(index, stepN),
    on: (type, fn) => deckEl.addEventListener(type, fn),
  };

  slides.forEach(s => { s.inert = true; });
  const [n0, s0] = fromHash();
  go(n0, s0);
  deckEl.classList.add('ready');
  emit(deckEl, 'deck:ready', { slides: slides.length });
})();
