import Gtk from './gtk';
import Renderer from './reconciler';

type EventListener = (event: string, handler: () => any) => any;

class Node {
  on: EventListener = () => null;
  showAll = () => null;
}

class Window {
  node: Node = new Node();
}

let hasStarted = false;

export default function render(element: any) {
  const window = new Window();
  const root = Renderer.createContainer(window);
  Renderer.updateContainer(element, root, null);
  if (!hasStarted) {
    hasStarted = true;
    window.node.on('destroy', () => Gtk.mainQuit());
    window.node.showAll();
    Gtk.main();
  }
}
