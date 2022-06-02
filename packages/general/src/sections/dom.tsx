import {
	createPortal,
	findDOMNode,
	flushSync,
	hydrate,
	render,
	unmountComponentAtNode,
	unstable_batchedUpdates,
	unstable_renderSubtreeIntoContainer,
	version
} from 'react-dom';

const keep = [
	createPortal,
	findDOMNode,
	flushSync,
	unmountComponentAtNode,
	unstable_batchedUpdates,
	hydrate,
	render,
	unstable_renderSubtreeIntoContainer,
	version
];

export const Section_DOM = () => {
	return null;
};
