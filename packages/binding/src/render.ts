import Gtk from './gtk';
import Renderer from './reconciler';
import Window from './elements/Window';

let hasStarted = false;

export default function render(element: Element) {
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
