# AGENTS.md — Coding Agent Guide

## Build / Lint / Test Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Type-check (tsc -b) + Vite production build
npm run lint      # ESLint on all .ts/.tsx files
npm run preview   # Serve the production build locally
```

**No test framework is configured.** No test files or test runner (vitest, jest) exist. To add tests, install vitest and add `"test": "vitest"` to package.json scripts.

## Project Structure

```
src/
├── components/
│   ├── Experience.tsx    # R3F Canvas, ScrollControls, post-processing
│   ├── Scene.tsx         # Camera rig, hiker, zone overlays, trail, environment
│   ├── Mountain.tsx      # Procedural terrain mesh, 3D props (signposts, lanterns, etc.)
│   ├── ZoneCard.tsx      # DOM overlay panels (outside Canvas)
│   └── LoadingScreen.tsx # Loading overlay with progress bar
├── utils/
│   ├── terrainSnap.ts    # Raycasting to sample terrain height
│   ├── toyTextures.ts    # Procedural matcap/shadow texture generation
│   └── activeZoneStore.ts # Minimal pub/sub store for active zone name
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── index.css             # Tailwind v4 + custom CSS
```

## Code Style Guidelines

### TypeScript
- **Strict mode** enabled with all flags: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- Use `interface` for component props, not `type` aliases.
- `verbatimModuleSyntax` enforced — use `import type` for type-only imports.
- `erasableSyntaxOnly` — no enums or parameter properties; use `const` objects instead.
- Avoid `any`. Use proper types or `unknown`.

### Imports
- React: `import { useState, useEffect, useMemo, useRef, useCallback } from 'react'`
- Three.js: `import * as THREE from 'three'` (always namespace import)
- R3F: `import { Canvas, useFrame, useThree } from '@react-three/fiber'`
- Drei: `import { ScrollControls, Float, Html, Stars, useScroll } from '@react-three/drei'`
- Relative imports for local modules: `'./Scene'`, `'../utils/terrainSnap'`

### Components & Naming
- Functional components only. Default export for the primary component per file.
- **Components**: PascalCase (`CameraRig`, `ZoneOverlays`)
- **Functions/variables**: camelCase (`getTerrainHeight`, `trailCurve`)
- **Constants**: UPPER_SNAKE_CASE (`TERRAIN_SIZE`, `ACTIVATION_RADIUS`, `CRYSTAL_COLORS`)
- **Props interfaces**: `Props` (or `PlanetProps` when multiple exist in file)
- **CSS classes**: kebab-case (`zone-panel`, `loading-screen`, `skill-grid`)
- Section headers: `/* ════════════════════ SECTION NAME ════════════════════ */`

### Three.js / R3F Patterns
- **Memoize expensive objects**: `useMemo` for geometries, materials, vectors — never create in `useFrame`.
- **Ref for per-frame state**: `useRef` for smoothed values, positions.
- **Cleanup**: Always dispose Three.js resources in `useEffect` return.
- **useFrame**: Keep callbacks lightweight. Avoid React state updates — use pub/sub store (`activeZoneStore.ts`).
- **Terrain snapping**: `sampleTerrainSurface(x, z)` for precise Y; fallback to `getTerrainHeight(x, z)`.
- **InstancedMesh** for many identical objects (see `AsteroidBelt`).
- Smooth with delta-based easing: `1 - Math.exp(-delta * speed)`.

### CSS / Styling
- Tailwind CSS v4 via `@tailwindcss/vite`. Import: `@import "tailwindcss"` in `index.css`.
- Theme tokens in `@theme { ... }` block (CSS custom properties).
- Fonts: `Outfit` (display), `Inter` (body).
- Palette: darks (`#0a0a0c`–`#2f2f36`), warm accent (`#c4915e`), gold (`#ffd700`).

### Error Handling
- Null-check raycasting: `if (!hit) return fallback`
- Guard refs: `if (!groupRef.current) return`
- Early returns for missing deps: `if (!terrainObject) return null`

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` 19, `react-dom` 19 | UI framework |
| `three` 0.183 | 3D engine |
| `@react-three/fiber` 9 | React renderer for Three.js |
| `@react-three/drei` 10 | Helpers (ScrollControls, Html, Float, Stars) |
| `tailwindcss` 4 | CSS framework (via @tailwindcss/vite) |
| `framer-motion` 12 | DOM animations |
| `vite` 8 | Build tool |
| `typescript` 5.9 | Type checker |

## 3D Coordinate System
- **Y-up**. XZ is the horizontal plane.
- Trail follows a `CatmullRomCurve3` spline along terrain surface.
- Scroll progress (`scroll.offset` 0→1) drives camera, hiker, and zone activation.
- Zone proximity: camera distance to sign positions (activation radius: 8.0 units).
- Canvas `dpr` capped at `[1, 1.5]` for mobile performance.

## Available Agent Skills

Skills live in `.agents/skills/`. Load them with the `skill` tool:

1. **threejs-fundamentals** — Three.js scene setup, cameras, renderer, Object3D hierarchy
2. **vercel-react-best-practices** — React/Next.js performance optimization
3. **web-design-guidelines** — Accessibility and UI compliance review
4. **find-skills** — Discover and install new skills
