# About

This repository is my exploration of general React features (including new ones added in React 18), patterns & ecosystem

# Repo structure

```
✅ = Done | 🟦 = Inprogress | ⬜ = Todo | ⬛ = As is
```

- /packages - source code
  - /general/sections - general React features - `pnpm dev:general`
    - ✅ Hooks (state, callback, defferedValue, effect, id, imperativeHandle, reducer, context, ref, memo, synExternalStore, transition)
    - ✅ Suspense (lazy, suspended fetch)
    - ✅ Dom - react-dom (flushSync, portal)
    - ✅ Other - rest of the features not included in other sections (Children, helpers)
    - ✅ Patterns (render prop, HOC)
    - ✅ Classes
  - 🟦 /renderer - custom React renderer - `pnpm dev:renderer`
  - ⬜ /ssr - server specific code to render react in node.js - `pnpm dev:ssr`
  - ⬛ /react-17 - Test package with react@17 for comparison
