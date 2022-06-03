import { useId } from 'react';
import { useRenderTrigger } from './custom';

export const UseID = () => {
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
