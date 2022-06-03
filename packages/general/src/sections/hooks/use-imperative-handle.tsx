import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export const UseImperativeHandle = () => {
	const ref = useRef<t_controlledRef>(null);

	function toggleChildComp() {
		const comp = ref.current;
		if (comp) comp.toggle();
	}

	console.log('Parent render');

	return (
		<div>
			<h4>useImperativeHandle</h4>
			<button style={{ marginBottom: '1rem' }} onClick={toggleChildComp}>
				Toggle from parent
			</button>
			<ControlledComp ref={ref} />
		</div>
	);
};

type t_controlledRef = { toggle: () => void };

const ControlledComp = forwardRef<t_controlledRef>((props, ref) => {
	const [active, setActive] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			toggle: () => setActive((v) => !v)
		};
	});

	return <div>I am {active ? 'active' : 'inactive'}</div>;
});
