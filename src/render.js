import Gtk from './gtk';
import Renderer from './reconciler';
import { GtkWindow } from './elements';

let hasStarted = false;

export default function render(element) {
  const window = new GtkWindow();
  const root = Renderer.createContainer(window);
  Renderer.updateContainer(element, root, null);
  if (!hasStarted) {
    hasStarted = true;
    window.node.on('destroy', () => Gtk.mainQuit());
    window.node.showAll();
    Gtk.main();
  }
}
