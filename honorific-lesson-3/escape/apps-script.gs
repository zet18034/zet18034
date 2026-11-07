// 출제 본부 탈출 · 수업 기록 서버 (Google Apps Script)
// 사용법은 setup.html 참고. 이 코드를 Google 시트의 [확장 프로그램 → Apps Script]에 붙여 넣고
// [배포 → 새 배포 → 웹 앱, 실행: 나, 액세스: 모든 사용자]로 배포한 뒤 나온 주소를 관리자 페이지에 넣는다.
const SHEET = 'events';
const HEAD = ['시각', '수업 코드', '팀', '팀 이름', '종류', '방', '카드', '선택', '경과(초)', '요약', 'at'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}

// 게임 기기 → 진행 기록 저장 (여러 건을 배열로 받음)
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const data = JSON.parse(e.postData.contents);
    const list = Array.isArray(data) ? data : [data];
    if (!list.length) return out_('ok');
    const rows = list.map(x => [new Date(), x.s || '', x.t || '', x.n || '', x.ty || '', x.r || '', String(x.c || ''), String(x.o || ''), x.e || 0, JSON.stringify(x.x || {}), x.at || Date.now()]);
    const sh = sheet_();
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, HEAD.length).setValues(rows);
    return out_('ok');
  } finally {
    lock.releaseLock();
  }
}

// 관리자 페이지·발표 슬라이드 → 기록 읽기 / 일시정지·공지 주고받기
function doGet(e) {
  const p = e.parameter || {};
  if (p.op === 'ctl') {
    const props = PropertiesService.getScriptProperties();
    const key = 'ctl_' + (p.s || '');
    if (p.set) props.setProperty(key, p.set);
    return json_(JSON.parse(props.getProperty(key) || '{}'));
  }
  const sh = sheet_();
  const last = sh.getLastRow();
  if (last < 2) return json_({ last: last, rows: [] });
  const vals = sh.getRange(2, 1, last - 1, HEAD.length).getValues();
  const rows = vals.filter(v => String(v[1]) === String(p.s || '')).map(v => ({
    t: v[2], n: v[3], ty: v[4], r: v[5], c: String(v[6]), o: String(v[7]), e: v[8], x: v[9], at: Number(v[10]) || (v[0] instanceof Date ? v[0].getTime() : 0)
  }));
  return json_({ last: last, rows: rows });
}

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function out_(s) { return ContentService.createTextOutput(s); }
