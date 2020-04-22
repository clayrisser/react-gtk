import { Options, BundleType, Gtk } from '@react-gtk/core';
import { createElement, Window } from '@react-gtk/elements';
import pkg from '../package.json';
import reconciler from './reconciler';

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
  const window = createElement(Window, {});
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
