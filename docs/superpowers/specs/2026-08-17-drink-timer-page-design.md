# Drink Timer Page

## Problem

Right now, clicking a drink button in `#menu` just changes the accent-color CSS variables and resets the countdown seconds — but the menu (`#menu`) stays on screen and nothing shows the selected drink or the countdown in a dedicated view. The user wants: click a drink → jump to a page showing that drink's picture in the center, a background tinted with that drink's accent color, and the countdown running below the picture.

## Approach

Stay a single-page app (one `index.html`, no page navigation/reload). Add a second full-screen view, `#drink-page`, hidden by default and shown by toggling a class on `<body>` — reusing the `drink-selected` class that already exists (currently only used to reveal the `.blob` background shapes).

### HTML (`index.html`)

Add a new block as a sibling of `#menu` inside `#app`:

```html
<div id="drink-page">
  <img id="drink-image" src="" alt="" />
  <div id="drink-timer"></div>
  <button id="back-to-menu-btn" type="button">
    <div class="top">Redo!</div>
    <div class="bottom"></div>
  </button>
</div>
```

This replaces the current standalone `<button>` that has `"Redo!"` as its label — reusing its existing `.top`/`.bottom` styling, just moved inside `#drink-page` and given the id `back-to-menu-btn`. The `"Order!"` button is left as-is (unbound), out of scope for this change.

The existing `#timer` div is removed — countdown text now renders into `#drink-timer` instead, since the countdown only ever appears on the drink page.

### CSS (`style.css`)

- `#drink-page { display: none; }` by default
- `body.drink-selected #menu { display: none; }`
- `body.drink-selected #drink-page { display: flex; ... }` (centered layout: image, then timer text below it)
- `body { background: var(--accent-color); }` is **not** changed globally — instead `#drink-page`'s own background uses `var(--accent-color)`, so the menu's brick background is untouched and only the drink page tints.

### JS (`app.js`)

1. Each object in the `drinks` array gets an `image` field pointing to its file in `Assets/` (`latte.png`, `matchalatte.png`, `hojicha.png`, `energydrink.png`, `cola.png`). No placeholder image file exists yet, so `Black` and `Espresso` temporarily point to an existing image (`Assets/hojicha.png`) as a stand-in — the user swaps in real art later.
2. In the per-drink button click handler, in addition to the existing accent-color/seconds logic:
   - set `#drink-image`'s `src` to `drink.image`
   - add `drink-selected` class to `body`
   - start the countdown immediately (inline the existing start logic — `isRunning = true; timerId = setInterval(tick, 1000);` — no separate start button click needed)
3. `updateDisplay()` writes to `#drink-timer` instead of `#timer`.
4. Remove the dead `document.getElementById("start-btn").addEventListener(...)` block — it currently throws on load because no `#start-btn` element exists, silently breaking anything registered after it in the file. Since starting is now automatic, this block is no longer needed.
5. `#back-to-menu-btn`'s click handler: `clearInterval(timerId); isRunning = false; body.classList.remove("drink-selected");` (returns to `#menu`, stops the countdown running in the background).

## Out of scope

- The `"Order!"` button's eventual purpose
- Real artwork for Black / Espresso
- Any content from `drinkintros.txt` (descriptions) — explicitly excluded per user's answer during design
- Alarm/"time's up" behavior beyond the existing `alert("Time is up!")`

## Testing

Manual only (no test framework in this project): click each of the 7 drink buttons, confirm the right image + background tint + running countdown appears, confirm "back to menu" stops the timer and returns cleanly, confirm no console errors on page load.
