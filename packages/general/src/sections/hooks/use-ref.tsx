import { useRef } from 'react';

export const UseRef = () => {
	const objectRef = useRef({
		name: 'Josh'
	});
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const divRef = useRef<HTMLDivElement | null>();

	return (
		<div>
			<h4>useRef</h4>
			<p ref={paragraphRef}>Paragraph</p>
			<div ref={(r) => (divRef.current = r)}>
				Hello {objectRef.current?.name || ''}
			</div>
		</div>
	);
};
