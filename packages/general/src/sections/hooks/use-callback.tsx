import { useCallback, useEffect, useState } from 'react';

export const UseCallback = () => {
	const [value, setValue] = useState('Nothing changed');

	const updated = useCallback(() => console.log(value), [value]);
	const captured = useCallback(() => console.log(value), []);

	function recreatedHandle() {
		updated();
		captured();
		setValue((Math.random() * 100).toFixed(1));
	}

	useEffect(() => {
		console.log('captured changed');
	}, [captured]);

	useEffect(() => {
		console.log('updated changed');
	}, [updated]);

	useEffect(() => {
		console.log('recreated changed');
	}, [recreatedHandle]);

	return (
		<div>
			<h4>useCallback</h4>
			<button onClick={recreatedHandle}>Update</button>
		</div>
	);
};
