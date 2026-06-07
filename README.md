# 38-0 — NBA Playoff Roster Builder

Build the perfect all-time NBA playoff roster and go 38-0.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

That's it — Vercel auto-detects Vite.

## Deploy to Netlify

```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

## Tech stack

- React + Vite
- Tailwind CSS v4
- Framer Motion (spin animations)
- html2canvas (save result as image)

## Project structure

```
src/
  data/players.js       # All player data, thresholds, simulation logic
  lib/useGameState.js   # Game state hook
  components/
    RosterGrid.jsx      # 5-slot roster display
    SlotMachine.jsx     # Animated spin wheel
    PickPanel.jsx       # Player selection UI
    ResultScreen.jsx    # Result + share card
  App.jsx               # Root component
```

## Adding players / teams

Edit `src/data/players.js`. Each key is `"DECADEs TEAMNAME"` and maps to an array of player objects with `name`, `pos`, `pts`, `reb`, `ast`, `stl`, `blk`.

## Tuning difficulty

Adjust `THRESHOLDS` in `src/data/players.js`:
```js
export const THRESHOLDS = {
  pts: 115,
  reb: 47,
  ast: 26,
  stl: 6.5,
  blk: 4.5,
};
```
