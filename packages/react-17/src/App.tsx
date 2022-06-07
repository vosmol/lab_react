import { useEffect, useState } from 'react';

export function App() {
	return (
		<div className="App">
			<UseState />
		</div>
	);
}

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

		return () => {
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
