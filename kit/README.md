# kit — 슬라이드 공용 부품

수업·발제 HTML 슬라이드가 함께 쓰는 기반. **고정하는 것은 보이지 않는 장치뿐**이고, 색·글꼴·레이아웃·장식은 덱마다 새로 디자인한다.

| 파일 | 무엇 |
|---|---|
| `deck.css` · `deck.js` | 기반 엔진: 1920×1080 무대, 장 이동, 단계 등장, 장 전환, 색 토큰 |
| `vendor/` | 불러 쓰는 라이브러리 22종(차트·수식·판서 등). 색인은 `vendor/README.md` |
| `demo/` | 엔진 시험 겸 견본 덱 — 기능마다 한 장씩 |
| `demo-canvas/` | 캔버스 모드·갈림길 견본 (물의 여행) |

## 최소 덱

```html
<link rel="stylesheet" href="../kit/vendor/pretendard/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="../kit/deck.css">
<style> :root { --deck-hue: 205; }  /* 이 덱의 디자인 */ </style>

<main class="deck">
  <section class="slide">
    <h2>제목은 바로 보임</h2>
    <p data-step>넘기면 나타남</p>
    <p data-step>한 번 더 넘기면 나타남</p>
  </section>
</main>
<script src="../kit/deck.js"></script>
```

`../` 개수는 덱 폴더 깊이에 맞춘다. 저장소 글꼴(`fonts/fonts.css`)을 써도 된다.

## 단계 (넘길 때마다 하나씩)

| 쓰는 법 | 뜻 |
|---|---|
| `data-step` 또는 `data-step="+"` | 앞 단계 + 1 (문서 순서대로) |
| `data-step="3"` | 3단계에 나타남 |
| `data-step="="` | 앞 요소와 같은 단계에 함께 |
| `data-step-off="4"` | 4단계에서 사라짐 (같은 자리에 다른 것을 띄울 때) |
| `data-anim="fade·down·left·right·zoom·blur·none"` | 나타나는 모양 (기본: 아래에서 위로) |

- 장에 들어오면 단계 없는 요소(제목 등)만 보인다. 뒤로 가면 마지막 단계부터 하나씩 사라지고, 이전 장으로 돌아가면 모든 단계가 보인 상태로 열린다.
- 쪽 번호 옆 점이 남은 단계를 보여 준다.

## 효과

| 쓰는 법 | 뜻 |
|---|---|
| `data-count="120"` | 보일 때 0부터 세어 올라감. `data-count-from`, `data-count-dur`(ms), `data-count-dec`(소수 자리), `data-count-group="off"`(쉼표 없이) |
| `data-split` | 보일 때 한 글자씩 (어절 단위 줄바꿈 유지). 간격은 CSS `--split-gap` |

효과는 가장 가까운 단계 요소가 켜질 때, 단계 밖에 있으면 장에 들어올 때 실행된다.

## 장 단위 설정

| 쓰는 법 | 뜻 |
|---|---|
| `data-transition="fade·slide·zoom·none"` | 장 전환 (`.deck`에 달면 덱 기본값) |
| `data-tone="dark"` | 어두운 색 토큰 (장·칸 어디에나) |
| `data-hue="25"` | 그 요소 안에서만 기준 색상 바꾸기 |
| `data-hide-chrome` | 이 장에서 쪽 번호 숨김 (표지 등) |
| `id="cover"` | 이 장에 있을 때 `.deck[data-at="cover"]`로 꾸밀 수 있음 |

## 색 토큰

`--deck-hue`(기준 색상 0~360), `--deck-chroma`(채도)만 바꾸면 다음이 따라온다:
`--bg` `--surface` `--ink` `--muted` `--line` `--accent` `--accent-soft` `--accent-ink`(accent 바탕 위 글자), 무대 밖 `--outside`.
시간: `--slide-dur` `--step-dur` `--step-ease` `--step-dist`. 엔진의 꾸밈 기본값은 우선순위 0이라 덱 CSS가 언제나 이긴다.

## 조작

→ · ↓ · 스페이스 · Enter · PageDown: 다음 / ← · ↑ · Backspace · PageUp: 이전 / Home · End: 처음 · 끝 / F: 전체 화면
화면 오른쪽 2/3 클릭 = 다음, 왼쪽 1/3 = 이전. 휴대폰은 좌우로 밀기.
버튼·링크·입력칸 안의 클릭은 넘기지 않는다. 직접 조작하는 모형(캔버스 등)에는 `data-no-nav`.

주소 `#s3` = 3장, `#s3.2` = 3장 2단계까지 (새로 고침해도 그 자리).

## 갈림길 (어느 덱에서나)

| 쓰는 법 | 뜻 |
|---|---|
| `<button data-go="id">` | 누르면 그 장으로 (`id` 또는 1부터 센 장 번호). 돌아올 자리를 기억 |
| `<button data-back>` | 기억한 자리(누른 장·단계)로 돌아감 |
| 장에 `data-next="id"` | 그 장의 마지막 단계에서 넘기면 갈 곳 (기본은 문서 순서상 다음 장) |
| 장에 `data-next="back"` | 다 보면 기억한 자리로 돌아감 (오답 설명 → 다시 퀴즈) |

갈림길로 들어온 장에서 ←는 온 자리로 돌아간다. 보통 `<a href="#s7">` 링크도 그대로 된다.

## 캔버스 모드 (큰 화면 위를 카메라가 날아다니기)

장에 위치를 적으면 자동으로 켜진다. 위치를 안 적은 덱은 지금처럼 한 장씩.

| 쓰는 법 | 뜻 |
|---|---|
| `data-x="-2300" data-y="100"` | 캔버스 위 장 가운데 좌표(px, 장 하나 = 1920×1080) |
| `data-scale="4"` | 장 크기 배율. 4면 네 배 큰 장(전체 지도), .3이면 작은 장(속으로 확대해 들어감) |
| `data-rotate="-6"` | 기울기(도) |
| `data-overview` | 내용 없는 장 — 이 장에 오면 전체 보기 |
| `data-hidden` | 그 장에 가기 전엔 안 보임 (갈림길 답 등) |

- 장 안 내용은 늘 1920×1080 기준으로 쓴다. 배율은 장 전체에 걸린다.
- 지금 장이 아닌 곳은 흐리게(`--idle-opacity`), 단계를 다 펼친 모습으로 보인다. 이동 시간 `--move-dur`.
- **O**: 전체 보기 켜고 끄기(Esc로 닫기). 전체 보기에서 장을 누르면 그곳으로.
- 멀리 이동할 때는 잠깐 물러났다 다가가고, 크기는 고르게 느껴지도록 보간한다. 움직임 줄이기 설정이면 바로 바뀐다.
- 확대·회전은 "전체 → 부분 → 다시 전체"처럼 뜻이 있을 때만. 남발하면 어지럽다.
- 견본: `demo-canvas/` (물의 여행: 지도 → 정거장 → 카드 속 퀴즈 → 갈림길 → 전체 보기).
- check-layout.js는 1920 무대 기준이라 캔버스 덱에는 맞지 않는다 — 화면 캡처로 확인.

## 다른 스크립트와 잇기

```js
document.getElementById('chart').addEventListener('step:on', e => { /* e.detail.fresh: 방금 넘겨서 켜졌는지 */ });
slideEl.addEventListener('slide:enter', e => { /* 장에 들어옴 */ });   // slide:leave 도 있음
deck.on('deck:change', e => { /* e.detail: index, step, max, slide */ });
deck.on('deck:resize', e => { /* e.detail.scale — leader-line 위치 다시 잡기 등 */ });
deck.go(2, 'end'); deck.next(); deck.prev(); deck.index; deck.step;
deck.jump('quiz'); deck.back(); deck.overview(true);
```

## 레이아웃 규칙

- 본문은 965px 선 위에 둔다(그 아래는 쪽 번호 자리). `.slide` 기본 여백 `96px 120px 128px`.
- 한국어 줄바꿈: 무대 전체 `word-break: keep-all; text-wrap: pretty`, 제목은 `balance`.
- 완성하면 `private/slide-templates/check-layout.js`로 점검(lesson-web-page 스킬 2절).
- 움직임 줄이기 설정을 켠 기기에서는 이동·글자 효과 없이 바로 나타난다.

## 아직 없는 것 (다음 단계)

발표자 화면(다음 장 미리보기·경과 시간), 장 목록(Esc)·진행 표시줄, 인쇄용 PDF, 판서·레이저·타이머·이름 뽑기.
