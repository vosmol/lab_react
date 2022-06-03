import { useDeferredValue, useMemo, useState } from 'react';

export const UseDefferedValue = () => {
	const [search, setSearch] = useState('');

	return (
		<div>
			<h4>useDefferedValue</h4>
			<input
				style={{ marginBottom: '1rem' }}
				type="text"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<List search={search} />
		</div>
	);
};

const List = ({ search }: { search: string }) => {
	const defferedSearch = useDeferredValue(search);

	const items = useMemo(() => {
		if (search.length < 1) return;
		return [...Array(10000).keys()].map((key) => (
			<p>
				{search} {key}
			</p>
		));
	}, [defferedSearch]);
	return <div>{items}</div>;
};
