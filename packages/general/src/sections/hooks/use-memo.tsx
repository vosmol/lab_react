import { useEffect, useMemo, useState } from 'react';
import { useRenderTrigger } from './custom';

function generate() {
  return Math.floor(Math.random() * 80 + 20);
}

export const UseMemo = () => {
  const { trigger } = useRenderTrigger();
  const [count, setCount] = useState(() => generate());

  const expensiveValue = useMemo(
    () => Array.from(Array(generate())).map((v) => ' item'),
    [count]
  );

  useEffect(() => {
    console.log('expensiveValue changed', expensiveValue.length);
  }, [expensiveValue]);

  return (
    <div>
      <h4>useMemo</h4>
      <button onClick={trigger}>Rerender</button>
      <button onClick={() => setCount(generate())}>Change</button>
      <div style={{ maxWidth: '500px', marginTop: '2rem' }}>
        {expensiveValue}
      </div>
    </div>
  );
};
