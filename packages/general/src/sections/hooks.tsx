import {
	forwardRef,
	useCallback,
	useDebugValue,
	useDeferredValue,
	useEffect,
	useId,
	useImperativeHandle,
	useInsertionEffect,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
	useSyncExternalStore,
	useTransition
} from 'react';

const keep = [
	// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
	useReducer,
	// -----
	useTransition,
	useDeferredValue,
	// https://blog.logrocket.com/exploring-react-18-three-new-apis/
	useSyncExternalStore
];

export const Section_Hooks = () => {
	useInsertionEffect(() => {
		const root = document.getElementById('root');
		console.log('insertionEffect', root?.childNodes.length);
	}, []);

	useLayoutEffect(() => {
		const root = document.getElementById('root');
		console.log('layoutEffect', root?.childNodes.length);
	}, []);

	useEffect(() => {
		const root = document.getElementById('root');
		console.log('regularEffect', root?.childNodes.length);
	}, []);

	return (
		<>
			<UseState />
			<UseCallback />
			<UseID />
			<UseEffect />
			<UseMemo />
			<UseRef />
			<UseImperativeHandle />
		</>
	);
};

const UseImperativeHandle = () => {
	const ref = useRef<t_controlledRef>(null);

	function toggleChildComp() {
		const comp = ref.current;
		if (comp) comp.toggle();
	}

	console.log('Parent render');

	return (
		<div>
			<h4>useImperativeHandle</h4>
			<button onClick={toggleChildComp}>Toggle from parent</button>
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

const UseState = () => {
	const [MM, setMin] = useState('--');
	const [HH, setHour] = useState('--');
	const [SS, setSec] = useState('--');

	useEffect(() => {
		function updateClock() {
			const now = new Date();

			setMin(('00' + now.getMinutes()).slice(-2));
			setHour(('00' + now.getHours()).slice(-2));
			setSec(('00' + now.getSeconds()).slice(-2));
		}

		const clock = setInterval(() => {
			updateClock();
		}, 5000);

		updateClock();

		return function () {
			console.log('cleared');
			clearInterval(clock);
		};
	}, []);

	console.log('clock rerendered');

	return (
		<div>
			<h4>useState</h4>
			<p>
				{HH}:{MM}:{SS}
			</p>
		</div>
	);
};

const UseRef = () => {
	const objectRef = useRef({
		name: 'Josh'
	});
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const divRef = useRef<HTMLDivElement | null>();

	return (
		<div>
			<h4>useRef</h4>
			<p ref={paragraphRef}>Paragraph</p>
			<div ref={(r) => (divRef.current = r)}>Div</div>
		</div>
	);
};

const UseMemo = () => {
	const { trigger } = useRenderTrigger();

	const expensiveValue = useMemo(
		() => Array.from(Array(50)).map((v) => 'item'),
		[]
	);

	useEffect(() => {
		console.log('expensiveValue changed');
	}, [expensiveValue]);

	return (
		<div>
			<h4>useMemo</h4>
			<button onClick={trigger}>Rerender</button>
		</div>
	);
};

const UseEffect = () => {
	const [val, setVal] = useState(() => 0);

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

const UseID = () => {
	const { trigger } = useRenderTrigger();
	return (
		<div>
			<h4>useId</h4>
			<button onClick={trigger}>Rerender</button>
			{Array.from(Array(4)).map((v, i) => (
				<ID key={i} />
			))}
		</div>
	);
};

const ID = () => {
	const id = useId();
	return <p>{id}</p>;
};

const UseCallback = () => {
	const [value, setValue] = useState('Nothing changed');

	const updated = useCallback(() => console.log(value), [value]);
	const captured = useCallback(() => console.log(value), []);

	function recreatedHandle() {
		updated();
		captured();
		setValue((Math.random() * 100).toFixed(1));
	}

	return (
		<div>
			<h4>useCallback</h4>
			<button onClick={recreatedHandle}>Update</button>
		</div>
	);
};

function useRenderTrigger() {
	const [, setVal] = useState(false);
	useDebugValue('render triggered', (value) => 'format:' + value);
	return { trigger: () => setVal((v) => !v) };
}