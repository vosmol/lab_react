# About

This repository is my refresher of React features and exploration of new ones added in React 18

# Repo structure

- Packages - source code
  - General - standard React features - `pnpm dev:general`
    - ✅ Hooks (state, callback, defferedValue, effect, id, imperativeHandle, reducer, context, ref, memo, synExternalStore, transition)
    - ✅ Suspense (lazy, suspended fetch)
    - ✅ Dom - react-dom (flushSync, portal)
    - ✅ Other - rest of the features not included in other sections (Children, helpers)
    - ✅ Patterns (render prop, HOC)
    - ✅ Classes
  - ⬜ Renderer - custom React renderer - `pnpm dev:renderer`
  - ⬜ SSR - server specific code to render react in node.js - `pnpm dev:ssr`
  - React-17 - Test package with react@17 for comparison
