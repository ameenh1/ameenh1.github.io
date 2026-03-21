# Agent Skills Documentation

This document outlines the available agent skills installed in this project and how to utilize them effectively.

---

## Codebase Navigation Guide

This section provides AI agents with the essential information needed to navigate and work with this codebase effectively.

### Project Overview

- **Project Name**: Portfolio - 3D Interactive Resume/Portfolio Website
- **Tech Stack**: React, TypeScript, Three.js, @react-three/fiber, @react-three/drei, Vite
- **Purpose**: Interactive 3D portfolio showcasing skills, projects, and achievements in a mountain climbing theme

### Directory Structure

```
src/
├── components/
│   ├── Experience.tsx    # Main 3D canvas setup with ScrollControls
│   ├── Scene.tsx         # 3D scene composition, camera rig, zone overlays
│   ├── Mountain.tsx       # Terrain mesh generation, 3D objects (signs, lanterns, etc.)
│   └── LoadingScreen.tsx # Initial loading overlay
├── utils/
│   ├── terrainSnap.ts    # Raycasting for terrain height sampling
│   └── toyTextures.ts    # Procedural texture generation
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── index.css             # Global styles (Tailwind + custom)

.agents/skills/           # AI agent skills for specialized tasks
```

### Key Files and Their Purposes

| File | Purpose |
|------|---------|
| `src/components/Experience.tsx` | Main 3D canvas, camera setup, ScrollControls, post-processing |
| `src/components/Scene.tsx` | Complete 3D scene: camera rig, mountain, trail, signs, zone overlays, lighting |
| `src/components/Mountain.tsx` | Procedural terrain mesh, 3D props (signposts, lanterns, campfire, crystals) |
| `src/components/LoadingScreen.tsx` | Animated loading screen with progress bar |
| `src/utils/terrainSnap.ts` | Raycasting utilities to sample terrain height at any (x, z) position |
| `src/utils/toyTextures.ts` | Procedural matcap and shadow texture generation |
| `src/index.css` | Tailwind + custom CSS for zone panels, loading screen, progress bar |

### How to Run the Project

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

### Key Dependencies

- `react` / `react-dom` - UI framework
- `three` - 3D graphics library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers (ScrollControls, Html, Float, Stars, etc.)
- `tailwindcss` - CSS framework (configured via @tailwindcss/vite)
- `typescript` - Type safety

### Important Conventions

#### 3D Coordinate System
- Y-axis is up (vertical)
- X and Z form the horizontal plane
- Trail runs along the terrain surface following a spline curve

#### Scroll-Based Navigation
- Uses `@react-three/drei` `ScrollControls` with `pages={6}`
- `useScroll()` hook provides `scroll.offset` (0 to 1)
- Camera follows character position based on scroll progress

#### Zone System
- 5 zones along the trail: base, skills, projects, awards, summit
- Each zone has:
  - Position on trail (via `trailCurve.getPointAt(t)`)
  - Scroll range for activation
  - Content component (React HTML)

#### Proximity-Based Activation (Current)
- Zone visibility determined by camera distance to sign positions
- Activation radius: 3.0 units from sign
- Uses `useThree().camera.getWorldPosition()` to get camera position
- Information displays in fixed CSS position (left side of screen)

#### HTML Overlays
- Use `@react-three/drei` `Html` component to render DOM elements in 3D scene
- For fixed positioning: use CSS `position: fixed` class instead of 3D coordinates
- Use `transform` on inner div for animation transitions

#### Terrain System
- `generateTrailCurve()` - Creates CatmullRom spline along terrain
- `getTerrainHeight(x, z)` - Gets terrain Y at given x, z
- `sampleTerrainSurface(x, z)` - Raycasts to find exact intersection with terrain mesh

### Common Tasks

#### Adding a New Zone
1. Add entry to `zones` array in Scene.tsx with name, trail position, scroll range
2. Create content component (e.g., `BaseCampContent`)
3. Add to `contentMap` object in ZoneOverlays

#### Modifying 3D Objects
- Props are in `Mountain.tsx` (Signpost, Lantern, Campfire, Crystal, Hiker)
- Import and use in Scene.tsx `TrailProps` component

#### Changing Activation Behavior
- Proximity activation in ZoneOverlays `useFrame` hook
- Modify `ACTIVATION_RADIUS` constant (currently 3.0)
- Can switch back to scroll-based by using `scroll.offset` instead of camera distance

#### Styling Zone Panels
- Edit `src/index.css` - `.zone-panel` class
- Fixed display uses `.fixed-display` class

---

## Available Skills

### 1. Vercel React Best Practices
**Location**: `.agents/skills/vercel-react-best-practices/`
**Purpose**: Provides React and Next.js performance optimization guidelines from Vercel Engineering.
**When to Use**: 
- Writing, reviewing, or refactoring React/Next.js code
- Optimizing component performance
- Improving data fetching patterns
- Reducing bundle size
- Enhancing user experience through performance improvements

**Key Guidelines**:
- Use `useMemo` and `useCallback` for expensive computations
- Implement proper code splitting and lazy loading
- Optimize images and media assets
- Leverage server-side rendering and static generation appropriately
- Minimize JavaScript bundle size
- Use efficient state management patterns

### 2. Web Design Guidelines
**Location**: `.agents/skills/web-design-guidelines/`
**Purpose**: Reviews UI code for Web Interface Guidelines compliance.
**When to Use**:
- Checking accessibility compliance (WCAG)
- Auditing design consistency
- Reviewing UX patterns
- Validating responsive design implementations
- Ensuring cross-browser compatibility

**Key Focus Areas**:
- Color contrast and readability
- Keyboard navigation support
- Screen reader compatibility
- Touch target sizing
- Form validation and error handling
- Loading states and feedback mechanisms

### 3. Three.js Fundamentals
**Location**: `.agents/skills/threejs-fundamentals/`
**Purpose**: Provides guidance on Three.js scene setup, cameras, renderer, Object3D hierarchy, and coordinate systems.
**When to Use**:
- Setting up 3D scenes
- Creating and configuring cameras
- Managing renderers and performance
- Working with Object3D hierarchies
- Implementing transformations and animations
- Adding lighting and materials

**Key Concepts**:
- Scene graph and object hierarchy
- Camera types (Perspective, Orthographic)
- Renderer configuration and optimization
- Geometry creation and manipulation
- Material types and shading
- Lighting techniques (ambient, directional, point, spot)
- Animation systems and loops
- Raycasting for object interaction

## How to Use These Skills

When working on specific tasks, you can invoke the relevant skill to get specialized guidance:

1. **For React performance issues**: Use the Vercel React Best Practices skill
2. **For UI/UX and accessibility concerns**: Use the Web Design Guidelines skill
3. **For 3D graphics and Three.js implementation**: Use the Three.js Fundamentals skill

The skills provide domain-specific instructions, workflows, and best practices that can be applied directly to your development work.

## Skill Installation

Additional skills can be installed using the `find-skills` skill when needed. To discover and install new skills:

1. Ask for help finding a skill for a specific task
2. Use the skill discovery mechanism to find relevant skills
3. Install the skill to make its guidance available

## Best Practices for Skill Usage

1. **Consult Early**: Review relevant skills before starting implementation
2. **Apply Consistently**: Use skill guidelines throughout development
3. **Combine Skills**: Multiple skills may be relevant for complex tasks
4. **Stay Updated**: Skills may be updated with new best practices
5. **Document Usage**: Note when skill guidance was applied in code comments or documentation

---

*Last Updated: March 16, 2026*