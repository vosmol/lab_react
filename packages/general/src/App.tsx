import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Section_DOM } from './sections/dom';
import { Section_Hooks } from './sections/hooks';
import { Section_Other } from './sections/other';
import { Section_Patterns } from './sections/patterns';
import { Section_Suspense } from './sections/suspense';
import { GenerateRouteLinks } from './utils';

const routes = {
	hooks: 'hooks',
	suspense: 'suspense',
	dom: 'dom',
	other: 'other',
	patterns: 'patterns'
};

function handleAll(path: string) {
	return path + '/*';
}

function App() {
	return (
		<BrowserRouter>
			<div className="App" style={{ padding: '2rem' }}>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<GenerateRouteLinks routes={routes} />
				</div>
				<Routes>
					<Route path="/" element={<Navigate to={routes.hooks} />} />
					<Route path={handleAll(routes.dom)} element={<Section_DOM />} />
					<Route path={handleAll(routes.hooks)} element={<Section_Hooks />} />
					<Route path={handleAll(routes.other)} element={<Section_Other />} />
					<Route
						path={handleAll(routes.suspense)}
						element={<Section_Suspense />}
					/>
					<Route
						path={handleAll(routes.patterns)}
						element={<Section_Patterns />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
