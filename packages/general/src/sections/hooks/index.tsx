import { Navigate, Route, Routes } from 'react-router-dom';
import { GenerateRouteLinks } from '../../utils';
import { UseCallback } from './use-callback';
import { UseDefferedValue } from './use-deffered-value';
import { UseEffect } from './use-effect';
import { UseID } from './use-id';
import { UseImperativeHandle } from './use-imperative-handle';
import { UseMemo } from './use-memo';
import { UseReducerAndContext } from './use-reducer-context';
import { UseRef } from './use-ref';
import { UseState } from './use-state';
import { UseSyncExternalStore } from './use-sync-external-store';
import { UseTransition } from './use-transition';

const routes = {
  'reducer-context': 'reducer',
  imperativeHandle: 'imperative-handle',
  syncExternalStore: 'sync-external-store',
  memo: 'memo',
  state: 'state',
  defferedValue: 'deffered-value',
  transition: 'transition',
  callback: 'callback',
  id: 'id',
  effect: 'effect',
  ref: 'ref'
};

export const Section_Hooks = () => {
  return (
    <div>
      <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        <GenerateRouteLinks
          styles={{
            color: '#3c6dff',
            border: '2px solid #3c6dff',
            borderRadius: '0.5rem',
            padding: '0.5rem'
          }}
          routes={routes}
        />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to={routes['reducer-context']} />} />
        <Route
          path={routes['reducer-context']}
          element={<UseReducerAndContext />}
        />
        <Route path={routes.state} element={<UseState />} />
        <Route path={routes.callback} element={<UseCallback />} />
        <Route path={routes.id} element={<UseID />} />
        <Route path={routes.effect} element={<UseEffect />} />
        <Route path={routes.memo} element={<UseMemo />} />
        <Route path={routes.ref} element={<UseRef />} />
        <Route
          path={routes.imperativeHandle}
          element={<UseImperativeHandle />}
        />
        <Route path={routes.defferedValue} element={<UseDefferedValue />} />
        <Route
          path={routes.syncExternalStore}
          element={<UseSyncExternalStore />}
        />
        <Route path={routes.transition} element={<UseTransition />} />
      </Routes>
    </div>
  );
};
