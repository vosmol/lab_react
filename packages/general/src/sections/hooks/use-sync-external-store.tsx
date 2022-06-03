import {
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
	useTransition
} from 'react';

const Store = (() => {
	let state = { count: 12 };
	let listeners = new Set<(newState: typeof state) => void>();

	function snapState() {
		return Object.freeze(state);
	}

	return {
		setState: (updater: (old: typeof state) => typeof state) => {
			state = updater(state);
			listeners.forEach((L) => L(state));
		},
		subscribe: (callback: () => void) => {
			listeners.add(callback);
			return () => listeners.delete(callback);
		},
		getSnapshot: () => {
			return snapState();
		},
		getServerSnapshot: () => {
			return snapState();
		}
	};
})();

export const UseSyncExternalStore = () => {
	// https://codesandbox.io/s/zl456?file=/src/App.tsx
	// https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
	// https://www.youtube.com/watch?v=oPfSC5bQPR8&ab_channel=ReactConf2021

	const [, setValue] = useState(0);

	const snapshot = useSyncExternalStore(
		Store.subscribe,
		Store.getSnapshot,
		Store.getServerSnapshot
	);

	const [isPending, startTransition] = useTransition();

	function measure() {
		startTransition(() => {
			setValue((v) => v + 1);
		});
	}

	return (
		<div>
			<h4>useSyncExternalStore</h4>
			<button
				onClick={() => {
					Store.setState((old) => ({ count: old.count + 1 }));
				}}
			>
				Increment
			</button>
			<p>Count: {snapshot.count}</p>
			<button onClick={measure}>Click and move mouse around</button>
			<div>
				{[...Array(5).keys()].map((i) => (
					<MousePosition key={i} />
				))}
			</div>
		</div>
	);
};

function useMousePosition() {
	const value = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handle = (e: MouseEvent) => {
			value.current = { x: e.clientX, y: e.clientY };
		};

		window.addEventListener('mousemove', handle);
		return () => window.removeEventListener('mousemove', handle);
	}, []);

	return value.current;
}

const MousePosition = () => {
	const { x, y } = useMousePosition();
	const start = performance.now();
	while (performance.now() - start < 30) {}
	return (
		<div>
			Mouse: {x}-{y}
		</div>
	);
};
