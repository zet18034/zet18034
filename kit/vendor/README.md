# kit/vendor — 슬라이드 부품 라이브러리

2026-11-18 npm에서 받아 버전을 고정해 둔 배포 파일. 덱은 CDN 대신 여기 파일을 상대 경로로 불러 쓴다
(예: 저장소 1단계 폴더의 덱이면 `../kit/vendor/chartjs/chart.umd.min.js`).
정확한 버전·라이선스·크기는 `manifest.json`. 각 폴더에 라이선스 파일이 함께 들어 있다(지우지 말 것).

필요한 덱에서만 불러온다. 기본 엔진(무대·단계 등장·발표 도구)은 이 폴더가 아니라 `kit/`에 따로 만든다.

| 폴더 | 무엇 | 불러오기 |
|---|---|---|
| `chartjs` | 선·막대·원 차트 (Chart.js 4.6) | `<script src=".../chartjs/chart.umd.min.js">` → `new Chart(canvas, {...})` |
| `charts-css` | HTML 표를 CSS만으로 막대·선 차트로 | `<link rel="stylesheet" href=".../charts-css/charts.min.css">` → `<table class="charts-css bar">` |
| `observable-plot` | 짧은 코드로 통계 그래프 (d3 필요) | `d3/d3.min.js` 다음에 `observable-plot/plot.umd.min.js` → `Plot.plot({...})` |
| `d3` | 데이터 시각화 기본 라이브러리 | `d3/d3.min.js` |
| `katex` | 수식, `contrib/mhchem`은 화학식 `\ce{2H2 + O2 -> 2H2O}` | `katex.min.css` + `katex.min.js` + `mhchem.min.js` + `auto-render.min.js` → `renderMathInElement(document.body)`. 기본 구분자는 `\( \)`·`\[ \]`·`$$` (한 개짜리 `$`는 안 됨 — 쓰려면 delimiters 옵션) |
| `mermaid` | 글로 쓰는 흐름도·순서도·시간표 (5.4MB, 필요할 때만) | `mermaid/mermaid.min.js` → `<pre class="mermaid">` |
| `markmap` | 글 목록 → 접고 펴는 마인드맵 (ESM 조각들, 폴더째 필요) | `<script type="module" src=".../markmap/dist/index.js">` → `<div class="markmap"><script type="text/template">- 주제 …` (화면에 보일 때 `<markmap-view>`로 바뀌어 shadow DOM 안에 그림, 기본 높이 400px) |
| `rough-notation` | 손으로 그은 밑줄·동그라미·형광펜 | `rough-notation.iife.js` → `RoughNotation.annotate(el,{type:'highlight'}).show()` |
| `leader-line` | 두 요소를 잇는 화살표 | `leader-line.min.js` → `new LeaderLine(a, b)` (무대 축소 시 위치 재계산 `line.position()`) |
| `drauu` | 판서(펜·형광펜·도형·지우개, SVG) | `import { createDrauu } from '.../drauu/index.mjs'` |
| `medium-zoom` | 그림 클릭하면 확대 | `medium-zoom.min.js` → `mediumZoom('img[data-zoom]')` |
| `img-comparison-slider` | 전/후 그림 밀어서 비교 | `styles.css` + `<script type="module" src=".../index.js">` → `<img-comparison-slider>` |
| `qr-code-styling` | QR 코드 (모양·색 지정) | `qr-code-styling.js` → `new QRCodeStyling({data:url,...}).append(el)` |
| `canvas-confetti` | 색종이 축하 효과 | `confetti.browser.js` → `confetti()` |
| `fitty` | 글자를 칸 크기에 꽉 맞춤 | `fitty.min.js` → `fitty('.fit')` |
| `matter-js` | 2D 물리 모형(낙하·충돌) | `matter.min.js` |
| `3dmol` | 분자 3D 보기 | `3Dmol-min.js` |
| `leaflet` | 지도 (타일은 OpenStreetMap 등 외부 서버 — 인터넷 필요) | `leaflet.css` + `leaflet.js` |
| `citation-js` | BibTeX → APA 등 참고문헌 (2.8MB) | `citation.min.js` → 전역 `Cite`가 아니라 `const Cite = require('citation-js')` → `new Cite(bibtex).format('bibliography',{template:'apa'})` |
| `dotlottie-web` | Lottie 움직이는 일러스트 (wasm 함께) | `import { DotLottie } from '.../dotlottie-web/index.js'`, `DotLottie.setWasmUrl('.../dotlottie-player.wasm')` |
| `open-props` | 다듬어진 CSS 변수: 속도 곡선·그림자·그라디언트·애니메이션·oklch 색 | `open-props.min.css`(전부) 또는 `easings.min.css` 등 필요한 것만 |
| `pretendard` | Pretendard 가변 글꼴, 쓰는 글자만 내려받는 분할본 | `<link rel="stylesheet" href=".../pretendard/pretendardvariable-dynamic-subset.css">` → `font-family: 'Pretendard Variable'` |

## Claude 링크로 올릴 때
Artifact는 다른 폴더(`../kit/...`)를 못 보므로, 덱이 쓰는 vendor 파일을 Artifact `files`로 함께 올리고 덱 안 경로를 그에 맞춘다
(또는 kit 빌드 스크립트로 한 파일에 합침 — kit 완성 때 정함).

## 업데이트
새 버전이 필요하면 임시 폴더에서 `npm install --ignore-scripts <패키지>@<버전>` 후 같은 파일만 바꿔 넣고 `manifest.json` 갱신.
