import {
	Children,
	cloneElement,
	createElement,
	createFactory,
	forwardRef,
	Fragment,
	isValidElement,
	Profiler,
	useEffect,
	useRef,
	version
} from 'react';

const keep = [
	// Legacy
	createFactory,
	Children,
	createElement,
	cloneElement
];

export const Section_Other = () => {
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		console.log(ref.current);
	}, []);

	return (
		<Profiler id="profiler" onRender={(...props) => console.dir(props)}>
			<Fragment>
				<>{version}</>
				<Button ref={ref} />
			</Fragment>
		</Profiler>
	);
};

const Button = forwardRef<HTMLButtonElement>((props, ref) => {
	return (
		<button style={{ marginLeft: '1rem' }} ref={ref}>
			Button
			<span>
				<span></span>
			</span>
		</button>
	);
});

const Section = <Section_Other />;

console.log(isValidElement(Section));
console.log(Children.count(Section));
