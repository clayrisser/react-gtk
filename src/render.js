import { Gtk } from 'node-gir';
import Renderer from './reconciler';
import { Window } from './elements';

let hasStarted = false;

export default function render(element) {
  const window = new Window();
  const root = Renderer.createContainer(window);
  Renderer.updateContainer(element, root, null);
  if (!hasStarted) {
    hasStarted = true;
    window.node.connect('destroy', () => Gtk.mainQuit());
    window.node.showAll();
    Gtk.main();
  }
}
