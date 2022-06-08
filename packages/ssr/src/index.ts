import {
  renderToPipeableStream,
  renderToReadableStream,
  renderToStaticMarkup,
  renderToStaticNodeStream,
  renderToString,
  version
} from 'react-dom/server';

const keep = [
  renderToPipeableStream,
  renderToReadableStream,
  renderToStaticMarkup,
  renderToStaticNodeStream,
  renderToString,
  version
];
