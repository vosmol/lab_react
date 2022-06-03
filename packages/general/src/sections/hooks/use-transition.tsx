import { memo, useState, useTransition } from 'react';

export const UseTransition = () => {
	const [quickVal, setQuickVal] = useState(0);
	const [slowVal, setSlowVal] = useState(0);
	const [isAsync, setAsync] = useState(true);
	const [, startTransition] = useTransition();

	function handle() {
		if (isAsync) {
			setQuickVal((v) => v + 1);
			startTransition(() => {
				setSlowVal((v) => v + 1);
			});
		} else {
			setQuickVal((v) => v + 1);
			setSlowVal((v) => v + 1);
		}
	}

	return (
		<div>
			<h4>useTransition</h4>
			<button onClick={handle} style={{ marginRight: '1rem' }}>
				Increment {quickVal}
			</button>
			<button
				style={{ marginRight: '1rem' }}
				onClick={() => setAsync((v) => !v)}
			>
				{isAsync ? 'Disable async rendering' : 'Enable async rendering'}
			</button>
			<MemoizedHeavyComponent val={slowVal} />
		</div>
	);
};

const HeavyComponent = ({ val }: { val: number }) => {
	const start = performance.now();
	while (performance.now() - start < 100) {}
	return <div style={{ marginTop: '1rem' }}>Im so heavy - value: {val}</div>;
};

const MemoizedHeavyComponent = memo(HeavyComponent);
