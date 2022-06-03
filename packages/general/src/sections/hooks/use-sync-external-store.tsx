import { useSyncExternalStore } from 'react';

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

	const snapshot = useSyncExternalStore(
		Store.subscribe,
		Store.getSnapshot,
		Store.getServerSnapshot
	);

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
		</div>
	);
};
