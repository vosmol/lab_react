import { Section_Context } from './sections/context'
import { Section_DOM } from './sections/dom'
import { Section_Hooks } from './sections/hooks'
import { Section_Other } from './sections/other'
import { Section_Suspense } from './sections/suspense'

function App() {
  return (
    <div className="App">
		<Section_Context/>
		<Section_DOM/>
		<Section_Hooks/>
		<Section_Other/>
		<Section_Suspense/>
    </div>
  )
}

export default App
