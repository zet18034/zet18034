// 출제 본부 탈출 · 배경 음악 (게임과 발표 슬라이드가 함께 쓴다)
// 파일 없이 Web Audio로 그 자리에서 만든다: 낮게 울리는 드론 + 바람 소리 + 멀리서 들리는 오르골 + 가끔 삐걱임·쿵.
// 사용: const h = ESC_BGM.start(audioContext, 크기); h.tense(); h.stop();
(function(){
  function start(AC, vol){
    vol = vol || 1;
    const t0 = AC.currentTime, nodes = [], timers = [];
    let alive = true, tense = false;
    const out = AC.createGain(); out.gain.setValueAtTime(0.0001, t0); out.gain.exponentialRampToValueAtTime(vol, t0 + 4); out.connect(AC.destination);
    // 잔향: 짧게 사라지는 잡음으로 만든 울림
    const rv = AC.createConvolver(), len = Math.floor(AC.sampleRate * 3.2), ib = AC.createBuffer(2, len, AC.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ib.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random()*2 - 1) * Math.pow(1 - i/len, 2.8); }
    rv.buffer = ib; const wet = AC.createGain(); wet.gain.value = .6; rv.connect(wet).connect(out);
    const dry = AC.createGain(); dry.gain.value = 1; dry.connect(out);
    const osc = (f, ty, dst) => { const o = AC.createOscillator(); o.type = ty; o.frequency.value = f; o.connect(dst); o.start(); nodes.push(o); return o; };
    const lfo = (rate, depth, param) => { const o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = rate; g.gain.value = depth; o.connect(g).connect(param); o.start(); nodes.push(o); return o; };
    // 1) 드론: 반음으로 부딪히는 낮은 음(라·시♭)을 서로 살짝 어긋나게
    const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 210; lp.Q.value = 5;
    const dg = AC.createGain(); dg.gain.value = .024; lp.connect(dg); dg.connect(dry); dg.connect(rv);
    osc(55, 'sawtooth', lp); osc(55.3, 'sawtooth', lp); osc(58.27, 'triangle', lp); osc(82.41, 'sine', lp);
    const fl = lfo(.045, 130, lp.frequency); lfo(.11, .011, dg.gain);
    // 2) 바람: 잡음을 좁은 대역으로 걸러 천천히 훑는다
    const nb = AC.createBuffer(1, AC.sampleRate * 4, AC.sampleRate), nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random()*2 - 1;
    const ns = AC.createBufferSource(); ns.buffer = nb; ns.loop = true;
    const bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 420; bp.Q.value = 1.4;
    const ng = AC.createGain(); ng.gain.value = .007; ns.connect(bp).connect(ng); ng.connect(dry); ng.connect(rv); ns.start(); nodes.push(ns);
    lfo(.06, 260, bp.frequency); lfo(.09, .004, ng.gain);
    // 3) 멀리서 들리는 오르골: 어두운 음계에서 서너 음을 띄엄띄엄
    const SC = [440, 466.16, 523.25, 554.37, 659.25, 698.46, 880, 932.33];
    const bell = (f, t, v) => {
      const g = AC.createGain(), o = AC.createOscillator(), o2 = AC.createOscillator(), g2 = AC.createGain();
      o.frequency.value = f; o2.frequency.value = f * 2.76; g2.gain.value = .22; o2.connect(g2).connect(g); o.connect(g);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      g.connect(rv); const d = AC.createGain(); d.gain.value = .35; g.connect(d).connect(dry);
      o.start(t); o2.start(t); o.stop(t + 2.5); o2.stop(t + 2.5);
    };
    const motif = () => {
      if (!alive) return; let w = 0; const now = AC.currentTime, n = 3 + Math.floor(Math.random()*3);
      for (let i = 0; i < n; i++) { bell(SC[Math.floor(Math.random()*SC.length)], now + w, .016); w += .5 + Math.random()*.55; }
      timers[0] = setTimeout(motif, (tense ? 6000 : 10000) + Math.random()*9000);
    };
    // 4) 삐걱임·먼 쿵 소리: 가끔
    const creak = () => {
      if (!alive) return; const t = AC.currentTime + .05;
      if (Math.random() < .55) {
        const s = AC.createBufferSource(); s.buffer = nb; const f = AC.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 12;
        f.frequency.setValueAtTime(700 + Math.random()*500, t); f.frequency.exponentialRampToValueAtTime(260 + Math.random()*200, t + 1.4);
        const g = AC.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(.05, t + .5); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
        s.connect(f).connect(g); g.connect(rv); g.connect(dry); s.start(t, Math.random()*2); s.stop(t + 1.7);
      } else {
        const o = AC.createOscillator(), g = AC.createGain(); o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(38, t + .5);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(.09, t + .02); g.gain.exponentialRampToValueAtTime(0.0001, t + .7);
        o.connect(g); g.connect(rv); g.connect(dry); o.start(t); o.stop(t + .8);
      }
      timers[1] = setTimeout(creak, 16000 + Math.random()*20000);
    };
    timers[0] = setTimeout(motif, 5000); timers[1] = setTimeout(creak, 14000);
    return {
      // 남은 시간이 얼마 없을 때: 드론이 밝아지고 일렁임이 빨라진다
      tense(){ if (!alive || tense) return; tense = true; try { const t = AC.currentTime; lp.frequency.setTargetAtTime(420, t, 3); fl.frequency.setTargetAtTime(.2, t, 3); } catch(e){} },
      get isTense(){ return tense; },
      stop(){
        if (!alive) return; alive = false; timers.forEach(clearTimeout);
        try { const t = AC.currentTime; out.gain.cancelScheduledValues(t); out.gain.setValueAtTime(Math.max(.0001, out.gain.value), t); out.gain.exponentialRampToValueAtTime(0.0001, t + .5); } catch(e){}
        setTimeout(() => { nodes.forEach(n => { try { n.stop(); } catch(e){} }); try { out.disconnect(); } catch(e){} }, 650);
      }
    };
  }
  window.ESC_BGM = {start};
})();
