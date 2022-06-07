import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { useRenderTrigger } from './hooks/custom';

export const Section_Patterns = () => {
	return (
		<div>
			<h4>Patterns</h4>
			<HigherOrderComponent />
			<RenderProp />
		</div>
	);
};

const HigherOrderComponent = () => {
	return (
		<div>
			<h4>HOC</h4>
		</div>
	);
};

type t_pokemon = {
	name: string;
	height: number;
	weight: number;
};

type t_species = {
	name: string;
	base_happiness: number;
};

const RenderProp = () => {
	const { trigger } = useRenderTrigger();

	return (
		<div>
			<h4>Render prop</h4>
			<button onClick={trigger}>Rerender</button>
			<Fetch url="https://pokeapi.co/api/v2/pokemon/ditto">
				{({
					fetch,
					isSuccess,
					isLoading,
					isError,
					data
				}: t_fetchProps<t_pokemon>) => {
					if (isLoading) return <Loading msg="pokemon ..." />;
					if (isError) return <Error />;
					if (isSuccess) {
						return (
							<div>
								<h5>{data.name}</h5>
								<p>weight: {data.weight}</p>
								<p>height: {data.height}</p>
							</div>
						);
					}
					return (
						<button onClick={fetch} style={{ marginTop: '1rem' }}>
							Load pokemon
						</button>
					);
				}}
			</Fetch>
			<Fetch url="https://pokeapi.co/api/v2/pokemon-species/aegislash">
				{({
					fetch,
					isSuccess,
					isLoading,
					isError,
					data
				}: t_fetchProps<t_species>) => {
					if (isLoading) return <Loading msg="species ..." />;
					if (isError) return <Error />;
					if (isSuccess) {
						return (
							<div>
								<h5>{data.name}</h5>
								<p>base happiness: {data.base_happiness}</p>
							</div>
						);
					}
					return (
						<button onClick={fetch} style={{ marginTop: '1rem' }}>
							Load species
						</button>
					);
				}}
			</Fetch>
		</div>
	);
};

const Loading: FC<{ msg?: string }> = ({ msg }) => {
	return <p>Loading {msg}</p>;
};

const Error = () => {
	return <p>Error</p>;
};

type t_state = 'loading' | 'error' | 'success' | 'initial';

type t_fetchProps<T = any> = {
	state: t_state;
	data: T;
	fetch: () => Promise<T>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
};

const Fetch: FC<{
	url: string;
	children: (props: t_fetchProps) => ReactNode;
}> = memo(({ url, children }) => {
	const [state, setState] = useState<t_state>('initial');
	const [data, setData] = useState(undefined);

	const handleFetch = useCallback(async () => {
		try {
			setState('loading');
			const r = await fetch(url);
			const data = await r.json();
			await new Promise((res) => {
				setTimeout(() => {
					res(true);
				}, 1000);
			});
			setData(data);
			setState('success');
		} catch (error) {
			setState('error');
		}
	}, [url]);

	const props = useMemo(
		() => ({
			fetch: handleFetch,
			isLoading: state === 'loading',
			isError: state === 'error',
			isSuccess: state === 'success',
			data,
			state
		}),
		[handleFetch, state]
	);

	return <div>{children(props)}</div>;
});
