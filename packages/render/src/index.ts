import reconciler from './reconciler';
import { Options } from './types';
import { Window } from './elements';

export * from './constants';
export * from './global';
export * from './types';

export default function render(jsx: JSX.Element, _options: Options = {}) {
  // create root element
  // a root node is already injected by this element constructor
  const rootElement = new Window();

  // create root fiber
  const root = reconciler.createContainer(rootElement, false, false);

  // reconcile virtual dom
  reconciler.updateContainer(jsx, root, null, () => {});

  // return rendered result (not required for side effect renderers)
  // in this case the rendered result is the node itself
  return rootElement.node;
}
