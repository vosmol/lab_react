import {
	Children,
	cloneElement,
	createElement,
	createFactory,
	createRef,
	forwardRef,
	Fragment,
	isValidElement,
	lazy,
	memo,
	Profiler,
	startTransition,
	StrictMode,
	version
} from 'react';

const keep = [
	Children,
	Fragment,
	Profiler,
	StrictMode,
	version,
	startTransition,
	memo,
	lazy,
	isValidElement,
	forwardRef,
	createRef,
	createFactory,
	createElement,
	cloneElement
];

export const Section_Other = () => {
	return null;
};

const SingleClickHandler = () => {
	return (
		<div onClick={() => {}}>
			{Array.from(Array(40)).map(() => (
				<button>Hello there</button>
			))}
		</div>
	);
};
