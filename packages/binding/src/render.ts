import * as pkg from '../package.json';
import Gtk from './gtk';
import Renderer from './reconciler';
import Window from './elements/Window';
import dev from './dev';
import { BundleType } from './types';

let hasStarted = false;

export default function render(element: Element, title = 'React Gtk') {
  const window = new Window();
  window.node.title = title;
  const root = Renderer.createContainer(window, false, false);
  Renderer.updateContainer(element, root, null, () => {});
  if (!hasStarted) {
    hasStarted = true;
    window.node.on('destroy', () => Gtk.mainQuit());
    window.node.showAll();
    Gtk.main();
  }
  Renderer.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: pkg.name,
    version: pkg.version
  });
}
