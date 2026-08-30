# Waiter Order Confirmation Overlay

## Summary

When a user selects a drink, a notepad-style slip slides in from the right, confirming the order like a waiter reading it back. The user either confirms (timer is set) or goes back to reselect.

## Trigger

Clicking any drink button in the menu.

## Appearance

- Cream/off-white VC V V background, slightly rotated (~1-2deg)
- Caveat font throughout
- Fixed width ~280px, vertically centered on the right side
- Content layout:
  - "Your order:" label
  - Drink name (large)
  - Duration in minutes
  - Two buttons: Confirm / Change order

## Animation

- Slides in from off-screen right (`translateX(100%)` → `translateX(0)`)
- Smooth ease transition (~0.4s)
- Slides back out on "Change order"

## Buttons

- **Confirm** — closes slip, timer is set to selected drink's duration, ready to start
- **Change order** — slides slip back out, drink selection resets (selectDrinks = null)

## Implementation Scope

- `index.html` — add overlay div
- `style.css` — notepad styles + slide animation
- `app.js` — show/hide overlay on drink click and button clicks
