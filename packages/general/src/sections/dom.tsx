import { FC, PropsWithChildren, useRef, useState } from 'react';
import {
	createPortal,
	findDOMNode,
	flushSync,
	hydrate,
	render,
	unmountComponentAtNode,
	version
} from 'react-dom';

const keep = [
	// deprecated in strict mode
	findDOMNode,
	// replaced with root.unmount - r18
	unmountComponentAtNode,
	// replaced with client.hydrateRoot - r18,
	hydrate,
	// replaced with createRoot - r18
	render
];

export const Section_DOM = () => {
	const flushRef = useRef<HTMLParagraphElement>(null);
	const [count, setCount] = useState(0);
	const [flush, setFlush] = useState(true);

	function handleClick() {
		const el = flushRef.current;

		if (flush) {
			flushSync(() => {
				setCount((v) => v + 1);
			});
		} else {
			setCount((v) => v + 1);
		}

		if (el) console.log(el.innerText);
	}

	return (
		<div>
			<p>React version: {version}</p>
			<div>
				<h4>Flush sync</h4>
				<button style={{ marginRight: '1rem' }} onClick={handleClick}>
					Flush
				</button>
				<button onClick={() => setFlush((v) => !v)}>
					{flush ? 'Disable flush' : 'Enable flush'}
				</button>
				<p ref={flushRef}>{count}</p>
			</div>
			<div>
				<h4>Portals</h4>
				<Parent>
					<Portal portalId="portal" createWrapper>
						<Child />
					</Portal>
				</Parent>
			</div>
		</div>
	);
};

const Portal: FC<
	PropsWithChildren<{
		portalId: string;
		createWrapper?: boolean;
	}>
> = ({ children, portalId, createWrapper }) => {
	let wrapper = document.getElementById(portalId);
	const prev = useRef<HTMLElement>();
	const targetParent = document.body;

	if (!wrapper) {
		if (!createWrapper) throw new Error('Portal element not found');

		if (prev.current) {
			wrapper = prev.current;
		} else {
			wrapper = document.createElement('div');
		}

		wrapper.setAttribute('id', portalId);
		targetParent.appendChild(wrapper);
	}

	prev.current = wrapper;

	return createPortal(children, wrapper);
};

const Parent: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<div
			style={{ overflow: 'hidden', height: 0 }}
			onClick={() => {
				console.log('my child was clicked');
			}}
		>
			{children}
		</div>
	);
};

const Child = () => {
	return <div style={{ height: 200, background: 'blue' }}></div>;
};
