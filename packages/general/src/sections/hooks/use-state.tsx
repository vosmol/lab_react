import { useEffect, useState } from 'react';

function superHeavyComputation(id: string) {
	console.log(id, 'Gonna wreck your CPU boi');
	return 0;
}

export const UseState = () => {
	useState(() => superHeavyComputation('lazy'));
	useState(superHeavyComputation('dynamic'));

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
		}, 1000);

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
