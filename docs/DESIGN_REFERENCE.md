# Rounders — дизайн-референс

Джерело: https://rounders.solutions/ (проаналізовано 2026-10-13).
Стек: Vue 3 SPA (Vite), один CSS-бандл `assets/index-lYstxfsC.css`, анімації — GSAP + ScrollTrigger (вбудовано в `assets/index-7QA402wO.js`).

**Позначки достовірності**
- ✅ — точне значення, взято напряму з production CSS/JS.
- ≈ — оцінка (візуально або виведено з кількох місць).

Усі нові UI-елементи мають використовувати токени з розділу 1, а не «сирі» hex-значення.

---

## 1. Дизайн-токени (✅ `:root`)

```css
:root {
  /* Surfaces */
  --ink:     #06080f;   /* фон сторінки, «дно» */
  --panel:   #0b0f1c;   /* нижня точка градієнта картки */
  --panel-2: #0e1322;   /* верхня точка градієнта картки */

  /* Lines */
  --line:        rgba(148,163,184,.13);  /* стандартний бордер / розділювач */
  --line-strong: rgba(148,163,184,.24);  /* бордер ghost-кнопок, іконок-плиток */

  /* Text */
  --text:  #e9ecf5;  /* основний */
  --muted: #8d96ac;  /* body-копі, лід, лінки навігації */
  --faint: #5b6378;  /* підписи, мета, таймстемпи, legal */

  /* Accents */
  --indigo: #6366f1;
  --violet: #8b5cf6;
  --blue:   #38bdf8;   /* eyebrow, mono-лейбли, focus ring, «живі» стани */
  --grad: linear-gradient(92deg, #6366f1 0%, #8b5cf6 52%, #38bdf8 100%);

  /* Status */
  --ok:   #34d399;
  --warn: #fbbf24;
  --bad:  #f87171;

  /* Type */
  --font-display: "Space Grotesk", sans-serif;
  --font-body:    "Inter", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;

  /* Shape / layout */
  --r: 14px;        /* радіус карток і терміналів */
  --wrap: 1180px;   /* макс. ширина контенту */
}
```

Тема лише темна; світлої теми немає. `::selection` — `background: #6366f173; color: #fff`.

### 1.1 Похідні кольори, що повторюються (✅)
Не винесені в токени, але використовуються послідовно — для нових компонентів брати саме їх:

| Призначення | Значення |
|---|---|
| Фон терміналу/код-блоку | `#070b16` |
| Ледь помітна заливка (ghost-кнопка, term-bar, rails) | `#ffffff05` (rails: `#ffffff03`) |
| Hover заливки ghost | `#ffffff0d` |
| Трек прогрес-бару / слайдера | `#94a3b81f` (слайдер: `#94a3b833`) |
| Точки вікна терміналу | `#2a3146` |
| Акцентний бордер «активної» картки | `#6366f166` … `#6366f180` |
| Hover-бордер картки | `#6366f173` |
| Glow «активної» картки | `box-shadow: 0 0 40px #6366f11f` |
| Фон навбару при скролі | `#06080fc7` + `backdrop-filter: blur(14px)` |
| Фон мобільного меню | `#06080ff5` + blur(14px) |
| Hero-сяйва | `#6366f124` (540px) і `#38bdf814` (480px), `filter: blur(110px)` |
| Фон «alt»-секцій | `linear-gradient(180deg, transparent, rgba(99,102,241,.035), transparent)` (або violet `.03`) |

### 1.2 Підсвітка синтаксису (✅)
`.tk-k` ключі `#7dd3fc` · `.tk-s` рядки `#c4b5fd` · `.tk-n` числа `#fbbf24` · `.tk-p` пунктуація `#5b6378` · `.tk-cmd` `#e9ecf5` · `.tk-ok/.tk-warn/.tk-bad/.tk-dim` → `--ok/--warn/--bad/--faint`.

---

## 2. Типографіка

### 2.1 Шрифти (✅, self-hosted через @fontsource, `font-display: swap`)
| Роль | Сімейство | Ваги |
|---|---|---|
| Display (h1–h3, кнопки, лого, великі підписи) | Space Grotesk | 400 / 500 / 600 |
| Body | Inter | 400 / 500 (+ кирилиця є) |
| Mono (eyebrow, лейбли, дані, код, мета) | JetBrains Mono | 400 / 500 |

⚠️ Space Grotesk і JetBrains Mono завантажуються без кириличного сабсету (у Space Grotesk кирилиці немає взагалі) — для UA-локалізації заголовки впадуть у fallback.

### 2.2 База (✅)
`body`: Inter 16px / `line-height: 1.6` / `--text` на `--ink`, `-webkit-font-smoothing: antialiased`.
`h1, h2, h3`: Space Grotesk 600, `line-height: 1.08`, `letter-spacing: -0.02em`.

### 2.3 Шкала (✅)
| Елемент | Шрифт | Розмір | Вага | Інше |
|---|---|---|---|---|
| H1 (hero) | Display | `clamp(38px, 5.4vw, 64px)` | 600 | margin `20px 0 18px` |
| H2 (`.h2`, секції) | Display | `clamp(30px, 4.4vw, 50px)` | 600 | margin `18px 0 16px` |
| Великі цифри (`.big`, ціни) | Mono | `clamp(28px, 3.4vw, 40px)` | 500 | lh 1.1 |
| H3 (кроки, таймлайн) | Display | 17px | 500 | — |
| Lead (`.lead`) | Inter | `clamp(15px, 1.4vw, 17.5px)` | 400 | `--muted`, `max-width: 56ch` |
| Body-копі в блоках | Inter | 14.5px (інколи 14px) | 400 | `--muted` |
| Лінки навігації | Inter | 14.5px | 400 | `--muted` → hover `--text` |
| Кнопка | Display | 15.5px (sm: 14px) | 500 | — |
| Лого | Display | 19px (футер 20px) | 600 | `letter-spacing: -0.01em`, нижній регістр |
| Eyebrow (`.eyebrow`) | Mono | 12px | 500 | `uppercase`, `letter-spacing: .14em`, `--blue`, лінія 22×1px перед текстом |
| Mono-H3 у плитках/фічах | Mono | 13px | 500 | uppercase, `.08–.1em`, `--blue` або `--text` |
| Mono-лейбл / ключ (`.pk`, `.tag`, `.wt`) | Mono | 11–12px | 400–500 | uppercase, `.1–.12em`, `--blue` або `--faint` |
| Термінал / код | Mono | 13px (≤980px: 11.5–12px) | 400 | lh 1.75 |
| Мета, таймстемпи, legal | Mono | 11–12.5px | 400 | `--faint` |

### 2.4 Патерни заголовків (✅)
- Кожна секція: `eyebrow` → `h2` → `lead`.
- Остання фраза заголовка обгорнута в `<span class="grad-text">` (градієнт `--grad`, clip-text). Часто — дві короткі «рубані» фрази: «Rules first. Weights second. **Luck never.**»
- Між словами у grad-фразі ставиться `&nbsp;`, щоб фраза не рвалась.
- У CTA-блоці eyebrow центрується і без лінії-префікса.

---

## 3. Сітка, відступи, розкладка

| Параметр | Значення |
|---|---|
| Контейнер `.wrap` | `max-width: 1180px; margin: 0 auto; padding: 0 24px` ✅ |
| Вертикальний ритм секції `.section` | `padding: clamp(72px, 10vw, 128px) 0` ✅ |
| Hero | `padding: clamp(120px, 16vh, 170px) 0 clamp(40px, 6vw, 70px)` ✅ |
| Відступ «шапка секції → контент» | 44–56px ✅ |
| Двоколонкові секції | `grid-template-columns: ~1fr 1.05–1.15fr; gap: clamp(36px, 5vw, 72px)` ✅ |
| Сітки фіч | `repeat(4, 1fr)`, gap 28px (плитки — 18px) ✅ |
| Пара карток | `1fr 1fr`, gap 18–24px ✅ |
| Стек усередині колонки (термінал + картка) | gap 14px ✅ |
| Навбар | fixed, висота 64px, `z-index: 50` ✅ |

**Брейкпоінти (✅):** 980px (2 кол. → 1; 4 кол. → 2), 880px (навбар → бургер), 780px (pricing/футер → 1 кол.), 640px (4-кол. → 1, менші падінги карток `18px 16px`), 560px (плитки → 1).

**Шкала відступів (≈ з CSS):** 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 24 · 28 · 36 · 44 · 48 · 56. Немає строгої 4/8-сітки; найчастіші — 14, 18, 24, 28.

---

## 4. Форма, бордери, тіні

| Що | Значення |
|---|---|
| Радіус карток, терміналів, іконок-плиток | `14px` (`--r`) ✅ |
| Радіус кнопок | `10px` ✅ |
| Пігулки (hub-chip) | `999px` ✅ |
| Прогрес-бари | `3–4px` ✅ |
| Focus ring | `outline: 2px solid var(--blue); outline-offset: 3px; border-radius: 4px` ✅ |
| Бордери | завжди 1px, `--line` (або `--line-strong`) ✅ |
| Тінь терміналу | `0 24px 60px #00000080` ✅ |
| Тінь primary-кнопки | `0 0 0 1px #8b5cf666, 0 8px 28px #6366f147` ✅ |
| Неонові акценти | `drop-shadow(0 0 8–12px <accent>@.3–.55)` ✅ |

Звичайні картки **не мають тіні** — глибина передається градієнтом фону + тонким бордером. Тінь лише в терміналів, primary-кнопок і «активних» станів (glow).

---

## 5. Компоненти

### 5.1 Кнопки (✅)
```css
.btn        { display:inline-flex; align-items:center; gap:9px; padding:13px 22px;
              border-radius:10px; font:500 15.5px var(--font-display);
              border:1px solid transparent;
              transition: transform .18s, box-shadow .18s, border-color .18s, background .18s ease; }
.btn-primary{ background:var(--grad); color:#fff;
              box-shadow:0 0 0 1px #8b5cf666, 0 8px 28px #6366f147; }
.btn-primary:hover{ transform:translateY(-2px);
              box-shadow:0 0 0 1px #8b5cf699, 0 14px 36px #6366f166; }
.btn-ghost  { border-color:var(--line-strong); color:var(--text); background:#ffffff05; }
.btn-ghost:hover{ border-color:#94a3b880; background:#ffffff0d; }
.btn-sm     { padding:9px 16px; font-size:14px; }   /* навбар */
```
Пари CTA: primary + ghost, gap 14px. Disabled/active/loading-станів на сайті немає — не визначено.

### 5.2 Картка `.card` (✅)
```css
.card { background:linear-gradient(180deg, var(--panel-2), var(--panel));
        border:1px solid var(--line); border-radius:var(--r); }
```
Внутрішні падінги залежно від щільності: `18px 20px` (компактна) · `20px 24px` · `24px 26px` · `26px 24px` (плитка) · `30px 28px` (pricing) · `clamp(40px,7vw,80px)` (CTA-бокс).
Варіанти:
- **Hover-плитка:** `translateY(-4px)` + `border-color:#6366f173`, `.25s ease`.
- **Highlighted (`.hot`):** `border-color:#6366f180; box-shadow:0 0 40px #6366f11f`; tag стає `--blue`.
- **Dimmed → lit (таймлайн):** `opacity:.45; translate(8px)` → `opacity:1`, бордер `#6366f166`, `.5s`.
- Внутрішні рядки розділяються `border-bottom:1px solid var(--line)`, padding `12px 0`.

### 5.3 Термінал / код-вікно `.term` (✅) — ключовий візуальний мотив
```css
.term     { background:#070b16; border:1px solid var(--line); border-radius:var(--r);
            overflow:hidden; box-shadow:0 24px 60px #00000080; }
.term-bar { display:flex; align-items:center; gap:8px; padding:10px 14px;
            border-bottom:1px solid var(--line); background:#ffffff05; }
.term-bar .dot { width:9px; height:9px; border-radius:50%; background:#2a3146; } /* ×3, сірі, не «світлофор» */
.term-bar .ttl { margin-left:6px; font:11.5px var(--font-mono); color:var(--faint); letter-spacing:.04em; }
.term-body{ padding:16px 18px; font:13px/1.75 var(--font-mono); overflow-x:auto; }
```
Заголовок вікна у форматі `rounders · request log — live`, `routing-rules / eu-cards-high-value.json`. Лог-рядок: ліворуч дія, праворуч статус (`justify-content:space-between`), статус фарбується `--ok/--warn/--faint`.

### 5.4 Навбар (✅)
Fixed, прозорий; після скролу — `#06080fc7` + blur(14px) + нижній бордер `--line` (перехід `.3s`). Ліворуч лого, по центру лінки (gap 28px), праворуч «Sign in» (текст) + `.btn-primary.btn-sm`. ≤880px — бургер (2 смужки 20×2px, перетворюються на ×), випадне меню з `translateY(-8px)` + fade `.2s`.

### 5.5 Лого (✅)
SVG 26×26: розгалужена лінія (одна гілка → дві), stroke-градієнт `#6366f1 → #38bdf8`, width 2.2, round caps; точка-вузол `r=2.4` кольору `#38bdf8`. Поруч слово `rounders` (Display 600, lowercase). Фавікон — та сама фігура однотонно `#6366f1`.

### 5.6 Eyebrow (✅)
Mono 12px/500, uppercase, `.14em`, `--blue`, з горизонтальною лінією 22×1px `--blue` і gap 10px. Текст часто з роздільником «·»: `PAYMENT ORCHESTRATION · BYO-PSP`.

### 5.7 Списки «ключ — значення» (✅)
`.proof` / `.facts`: рядки `display:flex; gap:14px; align-items:baseline`; ключ — mono 11–12px uppercase `--blue`, `min-width` 60–86px; значення — Inter 14.5px `--muted`.

### 5.8 Нумеровані кроки (✅)
Номер `01`–`04` mono 13px `--indigo`, h3 Display 17px/500, опис 14.5px `--muted`; gap між кроками 26px.

### 5.9 Фіча-колонки `.pt` (✅)
Mono-h3 13px uppercase `--blue` + `.1em` + абзац 14.5px `--muted`. 4 в ряд, без карток (просто текст).

### 5.10 Іконки (✅/≈)
Лінійні, `stroke-width` 1.7, round caps/joins, 22px у плитках; stroke — градієнт `#8b5cf6 → #38bdf8`. У діаграмах — іконка в квадраті `--ink` з бордером `--line-strong`, радіус 14px, колір `--blue`. Бібліотека іконок не підключена — ≈ кастомні інлайн-SVG.

### 5.11 Бари та метрики (✅)
- Трек: `height:5–6px; background:#94a3b81f; border-radius:4px`.
- Заповнення: `var(--grad)` (нейтральне), `#34d399 59→d9` (ok), `#fbbf24 4d→cc` (warn).
- Підпис-значення праворуч mono 12px.

### 5.12 Слайдер (єдиний інпут на сайті) (✅)
Трек 4px `#94a3b833`, радіус 4px; бігунок 18px коло з `var(--grad)`, бордер `2px #0b0f1c`, `box-shadow:0 0 10px #6366f199`, `cursor:grab`. Лейбл над ним — mono 13px uppercase `.08em` `--muted`, поточне значення праворуч `--text`.
⚠️ Текстових інпутів, селектів, чекбоксів, модалок, табів, тостів на сайті **немає** — для них стиль треба буде виводити з наявних (див. розділ 7).

### 5.13 Таймлайн (✅)
Вертикальна рейка 2px `#94a3b81f`, заповнюється `--grad` (scaleY по скролу). Пін 12px: `--ink` + бордер `2px rgba(148,163,184,.35)` → активний `--blue` + `0 0 12px #38bdf88c`.

### 5.14 Діаграми / схеми (✅)
Вузли — прямокутники зі stroke `--line`; стани: hot `#38bdf8`, ok `#34d399`, bad `#f87171` з drop-shadow. Ребра «грошового потоку» — зелений градієнт `#34d39926 → #34d399a6` зі стрілкою; керувальні зв'язки — dashed `rgba(99,102,241,.65)`. Hub-пігулка: бордер `rgba(99,102,241,.55)`, glow `0 0 24px #6366f129`.

### 5.15 Rails (бігучий рядок) (✅)
Між секціями, бордери зверху/знизу `--line`, padding 22px, фон `#ffffff03`. Mono 13px uppercase `.12em` `--muted`, роздільник — крапка 5px `--indigo` @.7, margin 0 28px. Анімація 36s linear infinite; краї з fade 120px у `--ink`.

### 5.16 CTA-бокс і футер (✅)
CTA: `.card` з центрованим текстом, радіальне сяйво знизу `rgba(99,102,241,.22)`. Футер: верхній бордер `--line`, `padding:56px 0 28px`, сітка `1.2fr 2fr`, 3 колонки лінків; заголовки колонок mono 12px uppercase `--faint`; лінки 14px `--muted` → `--text`; legal mono 12px `--faint` з бордером зверху.

---

## 6. Рух і взаємодія (✅)

| Що | Значення |
|---|---|
| Reveal при скролі (`.reveal`) | старт `opacity:0; translateY(26px)` → GSAP `duration:.9, ease:"power3.out"`, тригер `top 88%`, стагер через `data-delay` (0.05–0.2s, кроки 0.05/0.06) |
| Інші ScrollTrigger | старти `top 68–75%`; easing `power2.out`, `power2/1.inOut` |
| Hover кольору тексту | `.15s` |
| Кнопки | `.18s ease` |
| Плитки | `.25s ease`, `translateY(-4px)` |
| Стани діаграм/пінів | `.3–.5s` |
| `prefers-reduced-motion` | повністю поважається: анімації вимкнено, reveal одразу видимий, rails стають статичними |
| `scroll-behavior` | `smooth` |

---

## 7. Правила для нових UI-елементів

1. **Тільки темна тема.** Фон — `--ink`; підняті поверхні — градієнт `.card`; ніяких світлих заливок.
2. **Градієнт `--grad` — дозовано:** primary-кнопка, grad-text в одній фразі заголовка, заповнення барів/слайдерів. Не використовувати як фон великих площ.
3. **Mono = «дані/машинне»**: лейбли, ключі, числа, статуси, мета, eyebrow. Display = заголовки й кнопки. Inter = людський текст.
4. **Ієрархія тексту — через колір**, а не вагу: `--text` → `--muted` → `--faint`. Ваги body не вище 500.
5. **Бордери 1px `--line`, радіус 14px**, тіні — лише для терміналів, primary-CTA та glow-станів.
6. **Статусні кольори** (`--ok/--warn/--bad`) лише для станів, не для декору.
7. Кожна нова секція: `.section` → `.wrap` → eyebrow + `.h2` (з grad-хвостом) + `.lead`, потім контент з відступом 44–56px; анімувати через `.reveal` + `data-delay`.

### Рекомендовані (≈, не існують на сайті) стилі для відсутніх компонентів
Виведено з наявних патернів — узгодити перед реалізацією:
- **Text input / select:** висота ≈ 44px, `padding:12px 14px`, `border-radius:10px`, фон `#ffffff05`, бордер `--line-strong`, текст Inter 15px `--text`, placeholder `--faint`; hover бордер `#94a3b880`; focus бордер `--blue` + стандартний focus ring; error бордер `--bad`. Лейбл — mono 12px uppercase `.08em` `--muted`.
- **Checkbox/toggle:** off — трек `#94a3b833`; on — `--grad`, бігунок як у слайдера.
- **Tabs / segmented:** контейнер `.card`-бордер, активна вкладка `#ffffff0d` + текст `--text`, неактивні `--muted`.
- **Badge / chip:** радіус 999px, mono 11px uppercase, бордер і текст кольору статусу @ ~.55 / фон @ ~.08.
- **Modal:** `.card` на оверлеї `#06080fc7` + blur(14px) (як навбар), тінь як у `.term`.
- **Toast:** стиль `.term`-рядка: mono 13px, статус-колір праворуч.
