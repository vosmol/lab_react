import { memo, useState, useTransition } from 'react';

export const UseTransition = () => {
	const [quickVal, setQuickVal] = useState(0);
	const [slowVal1, setSlowVal1] = useState(0);
	const [slowVal2, setSlowVal2] = useState(0);
	const [isAsync, setAsync] = useState(true);
	const [, startTransition] = useTransition();

	function handle() {
		if (isAsync) {
			setQuickVal((v) => v + 1);
			startTransition(() => {
				setSlowVal1((v) => v + 1);
				setSlowVal2((v) => v + 1);
			});
		} else {
			setQuickVal((v) => v + 1);
			setSlowVal1((v) => v + 1);
			setSlowVal2((v) => v + 1);
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
				{isAsync
					? 'Disable concurrent rendering'
					: 'Enable concurrent rendering'}
			</button>
			<MemoizedHeavyComponent val={slowVal1} />
			<MemoizedHeavyComponent val={slowVal2} />
		</div>
	);
};

const HeavyComponent = ({ val }: { val: number }) => {
	const start = performance.now();
	while (performance.now() - start < 100) {}
	return <div style={{ marginTop: '1rem' }}>Im so heavy - value: {val}</div>;
};

const MemoizedHeavyComponent = memo(HeavyComponent);
