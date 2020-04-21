import Gtk from './gtk';
import pkg from '../package.json';
import reconciler from './reconciler';
import { BundleType, Options } from './types';
import { Window } from './elements';

let started = false;

export default function render(
  jsx: JSX.Element,
  options: Partial<Options> = {}
) {
  options as Options;
  const completeOptions: Options = {
    debug: true,
    title: 'React GTK',
    ...options,
  };
  const window = new Window();
  window.node.title = completeOptions.title;
  const root = reconciler.createContainer(window, false, false);
  reconciler.updateContainer(jsx, root, null, () => {});
  reconciler.injectIntoDevTools({
    bundleType: Number(completeOptions.debug) as BundleType,
    rendererPackageName: pkg.name,
    version: pkg.version,
  });
  if (!started) {
    started = true;
    window.node.on('destroy', () => Gtk.mainQuit());
    window.node.showAll();
    Gtk.main();
  }
}

export * from './constants';
export * from './global';
export * from './types';
