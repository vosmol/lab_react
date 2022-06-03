import { useDebugValue, useState } from 'react';

export function useRenderTrigger() {
	const [, setVal] = useState(false);
	useDebugValue('render triggered', (value) => 'format:' + value);
	return { trigger: () => setVal((v) => !v) };
}
