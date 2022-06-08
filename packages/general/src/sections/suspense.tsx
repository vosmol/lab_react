import { lazy, Suspense, useState } from 'react';

export const Section_Suspense = () => {
  const [mount, setMount] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setMount((v) => !v)}>
        {mount ? 'Unmount' : 'Mount'}
      </button>
      {mount ? (
        <>
          <Suspense fallback={<p>Loading the lazy one</p>}>
            <LazyComponent />
          </Suspense>
          <div>
            <Suspense fallback={<p>Loading ...</p>}>
              <Activity />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<p>Generating graph ...</p>}>
              <Graph />
              <Suspense fallback={<p>Generating summary ...</p>}>
                <GraphSummary />
              </Suspense>
            </Suspense>
          </div>
        </>
      ) : (
        <p>Nothing to see here</p>
      )}
    </div>
  );
};

const LazyComponent = lazy(
  () =>
    new Promise((res) => {
      setTimeout(() => {
        //@ts-ignore
        res({ default: Lazy });
      }, 2000);
    })
);

const Lazy = () => {
  return <p>Im sooooo lazy</p>;
};

const fetchActivity = createFetch({
  items: [
    { id: 1, name: 'Ordered 20 items' },
    { id: 2, name: 'Canceled order' }
  ]
});

const Activity = () => {
  const activitiy = fetchActivity();
  return (
    <div>
      <h3>Activity</h3>
      {activitiy.items.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

const fetchGraph = createFetch({ points: [4, 19, 9, 8] });

const Graph = () => {
  const graph = fetchGraph();
  return (
    <div>
      <h3>Graph</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {graph.points.map((p, i) => (
          <span key={i}>{'-'.repeat(p)}</span>
        ))}
      </div>
    </div>
  );
};

const fetchSummary = createFetch({ total: 10 }, 3000);

const GraphSummary = () => {
  const summary = fetchSummary();
  return (
    <div>
      <h3>Graph summary</h3>
      <div>Total: {summary.total}</div>
    </div>
  );
};

// Simplified implementation of https://codesandbox.io/s/bold-leftpad-blbx02?file=/src/fakeApi.js
function createFetch<T>(data: T, time = 1000) {
  let result: T;
  let promise: Promise<T>;

  return function () {
    if (result) return result;

    if (promise === undefined) {
      promise = new Promise<T>((res) => {
        setTimeout(() => {
          result = data;
          res(data);
        }, time);
      });
    }

    throw promise;
  };
}
