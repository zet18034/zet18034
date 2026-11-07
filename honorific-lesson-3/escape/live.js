// 출제 본부 탈출: 관리자 페이지와 발표 슬라이드가 함께 쓰는 연결·집계 코드
// 설정은 같은 사이트(zet18034.github.io)의 localStorage 'escape-admin-cfg'에 저장되므로,
// 관리자 페이지에서 한 번 연결하면 같은 브라우저로 연 발표 슬라이드도 같은 수업 데이터를 읽는다.
(function(){
const CFG_KEY = 'escape-admin-cfg';
const GAME_URL = 'https://zet18034.github.io/zet18034/honorific-lesson-3/escape/';
function cfg(){ try { return JSON.parse(localStorage.getItem(CFG_KEY) || '{}'); } catch(e) { return {}; } }
function setCfg(c){ try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch(e) {} }
const ready = c => !!(c && c.api && c.s);
function joinUrl(c){ return ready(c) ? `${GAME_URL}?api=${encodeURIComponent(c.api)}&s=${encodeURIComponent(c.s)}` : GAME_URL; }

async function fetchRows(c){
  if (!ready(c)) return null;
  if (c.api === 'local') return JSON.parse(localStorage.getItem('escape-local-events') || '[]').filter(e => e.s === c.s);
  const r = await fetch(`${c.api}?s=${encodeURIComponent(c.s)}&after=1&t=${Date.now()}`);
  const j = await r.json();
  return (j.rows || []).map(x => ({...x, x: typeof x.x === 'string' ? safeJSON(x.x) : (x.x || {})}));
}
function safeJSON(s){ try { return JSON.parse(s); } catch(e) { return {}; } }
async function setCtl(c, obj){
  if (!ready(c)) return;
  if (c.api === 'local') { const all = safeJSON(localStorage.getItem('escape-local-ctl') || '{}'); all[c.s] = obj; localStorage.setItem('escape-local-ctl', JSON.stringify(all)); return; }
  await fetch(`${c.api}?op=ctl&s=${encodeURIComponent(c.s)}&set=${encodeURIComponent(JSON.stringify(obj))}`);
}
async function getCtl(c){
  if (!ready(c)) return {};
  if (c.api === 'local') return safeJSON(localStorage.getItem('escape-local-ctl') || '{}')[c.s] || {};
  const r = await fetch(`${c.api}?op=ctl&s=${encodeURIComponent(c.s)}&t=${Date.now()}`); return r.json();
}

// 카드 목록 (cards.js 필요)
function cardList(){
  const out = [];
  (window.ESC_ROOMS || []).forEach((R, ri) => Object.entries(R.cards).forEach(([n, cd]) => {
    if (cd.opts || cd.dev) out.push({key:`${R.id}:${n}`, room:R, ri, n:+n, cd, kind: cd.dev ? 'dev' : cd.bonus ? 'bonus' : 'req'});
  }));
  return out;
}
const optText = (cd, o) => { const f = (cd.opts || []).find(x => x[0] === o); return f ? f[1] : o; };

function aggregate(rows){
  const teams = {}, cards = {};
  cardList().forEach(c => { cards[c.key] = {...c, wrong:0, wrongTeams:new Set(), opts:{}, solvedTeams:new Set(), openTeams:new Set(), hints:0}; });
  (rows || []).forEach(e => {
    const t = String(e.t); if (!t) return;
    const T = teams[t] || (teams[t] = {t, n:'', first:e.at || e.time, last:0, x:{}, events:0, cs:{}, lastCard:null});
    T.n = e.n || T.n; T.events++; T.last = Math.max(T.last, e.at || e.time || 0); T.x = e.x || T.x;
    if (e.ty === 'start') { T.first = e.at || e.time; T.cs = {}; T.lastCard = null; }   // 다시 시작하면 카드 상태도 새로
    // 팀별 카드 상태: s 해결, w 오답 수, o 열어 봄, p 선생님 통과
    const st = key => T.cs[key] || (T.cs[key] = {s:false, w:0, o:false, p:false});
    if (e.ty === 'clear') {   // 방 해제 = 그 방의 필수 카드·장치·금고 속 서류가 모두 끝남
      const R = (window.ESC_ROOMS || []).find(r => r.id === e.r);
      if (R) Object.entries(R.cards).forEach(([n, cd]) => { if ((cd.opts || cd.dev) && !cd.bonus) { const s = st(`${R.id}:${n}`); if (!s.s) { s.s = true; if (e.o === 'skip') s.p = true; } } });
    }
    const k = `${e.r}:${e.c}`, C = cards[k];
    if (!C) return;
    const s = st(k);
    if (e.ty === 'open') s.o = true;
    if (e.ty === 'wrong') { s.w++; s.o = true; T.lastCard = k; }
    if (e.ty === 'solve' || e.ty === 'bonus' || e.ty === 'device') { s.s = true; s.o = true; if (e.o === 'skip') s.p = true; }
    if (e.ty === 'open' || e.ty === 'hint') T.lastCard = k;
    if (e.ty === 'wrong') { C.wrong++; C.wrongTeams.add(t); const o = String(e.o || ''); C.opts[o] = (C.opts[o] || 0) + 1; }
    if (e.ty === 'solve' || e.ty === 'bonus' || e.ty === 'device') C.solvedTeams.add(t);
    if (e.ty === 'open') C.openTeams.add(t);
    if (e.ty === 'hint') C.hints++;
  });
  const list = Object.values(cards).map(C => {
    const top = Object.entries(C.opts).sort((a,b) => b[1]-a[1])[0];
    return {...C, wrongTeamsN:C.wrongTeams.size, solvedN:C.solvedTeams.size, openN:C.openTeams.size, topWrong: top ? {o:top[0], n:top[1], text: C.kind === 'dev' ? `비밀번호 ${top[0].replace('dev:','')}` : optText(C.cd, top[0]), why: C.kind === 'dev' ? '단서 카드의 계산법을 다시 확인' : (C.cd.traps || {})[top[0]] || ''} : null};
  });
  const tl = Object.values(teams).sort((a,b) => +a.t - +b.t);
  const rank = tl.slice().sort((a,b) => {
    const A = a.x || {}, Bx = b.x || {};
    if (A.end && Bx.end) return (A.total||0) - (Bx.total||0);
    if (A.end !== Bx.end) return A.end ? -1 : 1;
    return (Bx.keys||0) - (A.keys||0) || (Bx.solved||0) - (A.solved||0);
  });
  const missed = list.filter(c => c.kind !== 'dev' && c.wrong > 0).sort((a,b) => b.wrong - a.wrong || b.wrongTeamsN - a.wrongTeamsN);
  const best = rank.find(T => (T.x||{}).end) || null;
  const fewest = tl.filter(T => (T.x||{}).end).sort((a,b) => (a.x.wrong - b.x.wrong) || (a.x.total - b.x.total))[0] || null;
  const bonusKing = tl.slice().sort((a,b) => ((b.x||{}).bonus||0) - ((a.x||{}).bonus||0))[0] || null;
  return {teams:tl, rank, cards:list, missed, best, fewest, bonusKing: bonusKing && (bonusKing.x||{}).bonus ? bonusKing : null};
}
const fmt = s => { s = Math.max(0, Math.round(s || 0)); return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0'); };
const label = T => T ? `${T.t}팀 ${T.n ? '· ' + T.n : ''}` : '—';
// 관리자 → 특정 팀 기기 명령 (카드·방 통과, 다시 시작, 팀 공지). 제어 정보(ctl)의 cmds 목록에 쌓아 보낸다.
// 기기는 8초마다 목록을 읽어 자기 팀 명령 중 처음 보는 것만 실행한다. 목록은 최근 12개·15분 안의 것만 남긴다(주소 길이 제한).
async function sendCmd(c, ctl, cmd){
  const now = Date.now();
  const cmds = (Array.isArray(ctl.cmds) ? ctl.cmds : []).filter(m => m && now - m.id < 15*60*1000).slice(-11);
  cmds.push(Object.assign({id: now}, cmd));
  const next = Object.assign({}, ctl, {cmds});
  await setCtl(c, next);
  return next;
}
window.ESC_LIVE = {cfg, setCfg, ready, joinUrl, fetchRows, setCtl, getCtl, sendCmd, aggregate, cardList, fmt, label, GAME_URL};
})();
