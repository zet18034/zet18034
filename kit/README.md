# kit — 슬라이드 공용 부품

수업·발제 HTML 슬라이드가 함께 쓰는 기반. **고정하는 것은 보이지 않는 장치뿐**이고, 색·글꼴·레이아웃·장식은 덱마다 새로 디자인한다.

| 파일 | 무엇 |
|---|---|
| `deck.css` · `deck.js` | 기반 엔진: 1920×1080 무대, 장 이동, 단계 등장, 장 전환, 색 토큰 |
| `vendor/` | 불러 쓰는 라이브러리 22종(차트·수식·판서 등). 색인은 `vendor/README.md` |
| `demo/` | 엔진 시험 겸 견본 덱 — 기능마다 한 장씩 |

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

## 다른 스크립트와 잇기

```js
document.getElementById('chart').addEventListener('step:on', e => { /* e.detail.fresh: 방금 넘겨서 켜졌는지 */ });
slideEl.addEventListener('slide:enter', e => { /* 장에 들어옴 */ });   // slide:leave 도 있음
deck.on('deck:change', e => { /* e.detail: index, step, max, slide */ });
deck.on('deck:resize', e => { /* e.detail.scale — leader-line 위치 다시 잡기 등 */ });
deck.go(2, 'end'); deck.next(); deck.prev(); deck.index; deck.step;
```

## 레이아웃 규칙

- 본문은 965px 선 위에 둔다(그 아래는 쪽 번호 자리). `.slide` 기본 여백 `96px 120px 128px`.
- 한국어 줄바꿈: 무대 전체 `word-break: keep-all; text-wrap: pretty`, 제목은 `balance`.
- 완성하면 `private/slide-templates/check-layout.js`로 점검(lesson-web-page 스킬 2절).
- 움직임 줄이기 설정을 켠 기기에서는 이동·글자 효과 없이 바로 나타난다.

## 아직 없는 것 (다음 단계)

발표자 화면(다음 장 미리보기·경과 시간), 장 목록(Esc)·진행 표시줄, 인쇄용 PDF, 판서·레이저·타이머·이름 뽑기.
