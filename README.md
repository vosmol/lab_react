# About

This repository is my exploration of general React features (including new ones added in React 18), patterns & ecosystem

# Run

Project uses `pnpm` as the package manager.

1. Install dependencies `pnpm i`
2. Run one of the scripst listed in [Repo structure](#repo-structure-monorepo)

# Repo structure (Monorepo)

```
✅ = Done | 🟦 = Inprogress | ⬜ = Todo
```

- /packages - source code

  - /general/sections - general React features (Vite.js app) `pnpm dev:general`
    - ✅ Hooks (state, callback, defferedValue, effect, id, imperativeHandle, reducer, context, ref, memo, synExternalStore, transition)
    - ✅ Suspense (lazy, suspended fetch)
    - ✅ Dom - react-dom (flushSync, portal)
    - ✅ Other - rest of the features not included in other sections (Children, helpers)
    - ✅ Patterns (render prop, HOC)
    - ✅ Classes
  - 🟦 /renderer - custom React renderer (Vite.js app) `pnpm dev:renderer`
  - ⬜ /ssr - server specific code to render react in node.js - `pnpm dev:ssr`
