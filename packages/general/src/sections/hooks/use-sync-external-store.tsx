import { useSyncExternalStore } from 'react';

export const UseSyncExternalStore = () => {
	return (
		<div>
			<h4>useSyncExternalStore</h4>
			<Counter />
			<CounterDisplay />
		</div>
	);
};

const Counter = () => {
	const { snapshot, setState } = useStore();
	return (
		<button
			style={{ marginBottom: '1rem' }}
			onClick={() => setState((old) => ({ value: old.value + 1 }))}
		>
			Increment value: {snapshot.value}
		</button>
	);
};

const CounterDisplay = () => {
	const { snapshot } = useStore();
	return <div>Value: {snapshot.value}</div>;
};

// ===============

const ExternalStore = createStore({ value: 0 });

function useStore() {
	const Store = ExternalStore;

	const snapshot = useSyncExternalStore(
		Store.subscribe,
		Store.getSnapshot,
		Store.getServerSnapshot
	);

	return { snapshot, setState: Store.setState };
}

function createStore<T>(initialState: T) {
	let state = initialState;
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
}
