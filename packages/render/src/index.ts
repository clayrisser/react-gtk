import reconciler from './reconciler';
import { BaseElement } from './elements';
import { BaseNode, Options } from './types';

export * from './types';

export default function render(jsx: JSX.Element, _options: Options = {}) {
  // create root node
  // this is the interface of the renderer that the react renderer is binding to
  const rootNode: BaseNode = { hello: 'world' };

  // create root element
  // think of an element as a react component that is directly bound to the reconciliation lifecycle methods
  // the root element is not created with JSX
  const rootElement = new BaseElement(rootNode);

  // create root fiber
  const root = reconciler.createContainer(rootElement, false, false);

  // reconcile virtual dom
  reconciler.updateContainer(jsx, root, null, () => {});

  // return rendered result (not required for side effect renderers)
  // in this case the rendered result is the node itself
  return rootElement.node;
}
