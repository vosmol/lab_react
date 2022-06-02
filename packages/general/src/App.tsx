import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Section_Context } from './sections/context';
import { Section_DOM } from './sections/dom';
import { Section_Hooks } from './sections/hooks';
import { Section_Other } from './sections/other';
import { Section_Suspense } from './sections/suspense';

const routes = {
	context: 'context',
	dom: 'dom',
	hooks: 'hooks',
	other: 'other',
	suspense: 'suspense'
};

function App() {
	return (
		<BrowserRouter>
			<div className="App" style={{ padding: '2rem' }}>
				<div>
					{Object.values(routes).map((path) => (
						<Link key={path} to={path}>
							<span style={{ marginRight: '1rem' }}>{path}</span>
						</Link>
					))}
				</div>
				<Routes>
					<Route path="/" element={<Navigate to={routes.suspense} />} />
					<Route path={routes.context} element={<Section_Context />} />
					<Route path={routes.dom} element={<Section_DOM />} />
					<Route path={routes.hooks} element={<Section_Hooks />} />
					<Route path={routes.other} element={<Section_Other />} />
					<Route path={routes.suspense} element={<Section_Suspense />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
