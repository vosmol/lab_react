import {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useState
} from 'react';

function getNodes(id: string) {
  const root = document.getElementById('root');
  console.log(id, root?.childNodes.length);
}

export const UseEffect = () => {
  const [val, setVal] = useState(0);

  useInsertionEffect(() => getNodes('insertionEffect'), []);
  useLayoutEffect(() => getNodes('layoutEffect'), []);
  useEffect(() => getNodes('useEffect'), []);

  useEffect(() => {
    console.log('each rerender');
  });

  useEffect(() => {
    console.log('first render');

    return function () {
      console.log('cleanup once on unmount');
    };
  }, [false]);

  useEffect(() => {
    console.log('first render + val changes render');
  }, [val]);

  useEffect(() => {
    console.log(
      'first render + one more time after the value is higher than 3'
    );
  }, [val > 3]);

  function handle() {
    setVal((v) => v + 1);
  }

  return (
    <div>
      <h4>useEffect</h4>
      <button onClick={handle}>Render {val}</button>
    </div>
  );
};
