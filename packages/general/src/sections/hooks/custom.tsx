import { useCallback, useDebugValue, useState } from 'react';

export function useRenderTrigger() {
  const [, setVal] = useState(false);
  useDebugValue('render triggered', (value) => 'format:' + value);

  const trigger = useCallback(() => setVal((v) => !v), []);

  return { trigger };
}
