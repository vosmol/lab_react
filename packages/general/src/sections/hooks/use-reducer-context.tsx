import {
	createContext,
	CSSProperties,
	Dispatch,
	FC,
	memo,
	Reducer,
	useContext,
	useMemo,
	useReducer
} from 'react';

enum e_playerAction {
	'play',
	'pause',
	'volume',
	'speed',
	'subtitles',
	'fullscreen'
}

const defaultState = {
	paused: true,
	volume: 0,
	speed: 1,
	subtitles: false,
	fullscreen: false
};

type t_state = typeof defaultState;

type t_action<T = string> = { type: T };

type t_actionWithPayload<T, R> = t_action<T> & { payload: R };

type t_actions =
	| t_actionWithPayload<e_playerAction.speed, { value: number }>
	| t_actionWithPayload<e_playerAction.volume, { value: number }>
	| t_actionWithPayload<e_playerAction.subtitles, { active: boolean }>
	| t_actionWithPayload<e_playerAction.fullscreen, { active: boolean }>
	| t_action<e_playerAction.pause>
	| t_action<e_playerAction.play>;

const reducer: Reducer<t_state, t_actions> = (state, action) => {
	switch (action.type) {
		case e_playerAction.play:
			return { ...state, paused: false };
		case e_playerAction.pause:
			return { ...state, paused: true };
		case e_playerAction.fullscreen:
			return { ...state, fullscreen: action.payload.active };
		case e_playerAction.speed:
			return { ...state, speed: action.payload.value };
		case e_playerAction.subtitles:
			return { ...state, subtitles: action.payload.active };
		case e_playerAction.volume:
			return { ...state, volume: action.payload.value };
		default:
			throw new Error('Invalid Reducer action');
	}
};

const initializer = (initialState: t_state): t_state => {
	return {
		...initialState,
		volume: 1
	};
};

const ControlsContext = createContext<
	{ dispatch: Dispatch<t_actions> } | undefined
>(undefined);

const NO_PROVIDER_MSG = 'useControls used outside Provider';

function useControls() {
	const context = useContext(ControlsContext);
	if (context === undefined) throw new Error(NO_PROVIDER_MSG);
	return context;
}

const btnStyles: CSSProperties = {
	borderRadius: '10px',
	cursor: 'pointer',
	background: 'white',
	width: '40px',
	height: '40px',
	display: 'grid',
	placeItems: 'center',
	userSelect: 'none'
};

export const UseReducerAndContext = () => {
	const [state, dispatch] = useReducer(reducer, defaultState, initializer);
	const value = useMemo(() => ({ dispatch }), []);

	return (
		<ControlsContext.Provider value={value}>
			<div>
				<h4>useReducer & useContext</h4>
				<div style={{ width: state.fullscreen ? '700px' : '600px' }}>
					<div
						style={{
							width: '100%',
							height: state.fullscreen ? '200px' : '150px',
							background: 'gray',
							display: 'grid',
							placeItems: 'center',
							position: 'relative'
						}}
					>
						{state.paused ? (
							<div
								style={btnStyles}
								onClick={() => dispatch({ type: e_playerAction.play })}
							>
								▶
							</div>
						) : null}
						{!state.paused ? (
							<div
								style={btnStyles}
								onClick={() => dispatch({ type: e_playerAction.pause })}
							>
								⏸
							</div>
						) : null}
						{state.subtitles ? (
							<span
								style={{ position: 'absolute', left: '10px', bottom: '10px' }}
							>
								<b>Subtitles</b>
							</span>
						) : null}
					</div>
					<div style={{ display: 'flex', marginTop: '0.5rem' }}>
						<Volume volume={state.volume} />
						<Speed speed={state.speed} />
						<Subtitles active={state.subtitles} />
						<Fullscreen active={state.fullscreen} />
					</div>
				</div>
			</div>
		</ControlsContext.Provider>
	);
};

function handleVolume(current: number) {
	const volumes = [0, 0.3, 0.5, 0.7, 1];
	const index = (volumes.indexOf(current) + 1) % volumes.length;
	return volumes[index];
}

const Volume: FC<{ volume: number }> = memo(({ volume }) => {
	const { dispatch } = useControls();

	console.log('volume rerendered');

	return (
		<button
			style={{ marginRight: '0.5rem' }}
			onClick={() =>
				dispatch({
					type: e_playerAction.volume,
					payload: { value: handleVolume(volume) }
				})
			}
		>
			Volume: {volume}
		</button>
	);
});

function handleSpeed(current: number) {
	const volumes = [0.5, 1, 1.5, 2];
	const index = (volumes.indexOf(current) + 1) % volumes.length;
	return volumes[index];
}

const Speed: FC<{ speed: number }> = memo(({ speed }) => {
	console.log('speed rerendered');

	return (
		<div>
			<ControlsContext.Consumer>
				{(context) => {
					if (context === undefined) {
						throw new Error(NO_PROVIDER_MSG);
					}

					const { dispatch } = context;

					return (
						<button
							style={{ marginRight: '0.5rem' }}
							onClick={() =>
								dispatch({
									type: e_playerAction.speed,
									payload: { value: handleSpeed(speed) }
								})
							}
						>
							Speed: {speed}
						</button>
					);
				}}
			</ControlsContext.Consumer>
		</div>
	);
});

const Subtitles: FC<{ active: boolean }> = memo(({ active }) => {
	const { dispatch } = useControls();

	console.log('subtitles rerendered');

	return (
		<button
			style={{ marginRight: '0.5rem' }}
			onClick={() =>
				dispatch({
					type: e_playerAction.subtitles,
					payload: { active: !active }
				})
			}
		>
			Subtitles: {active ? 'On' : 'Off'}
		</button>
	);
});

const Fullscreen: FC<{ active: boolean }> = memo(({ active }) => {
	const { dispatch } = useControls();

	console.log('fullscreen rerendered');

	return (
		<button
			onClick={() =>
				dispatch({
					type: e_playerAction.fullscreen,
					payload: { active: !active }
				})
			}
		>
			Screen: {active ? 'full' : 'small'}
		</button>
	);
});
