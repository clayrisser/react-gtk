import nodeGtk from 'node-gtk';

const Gtk = nodeGtk.require('Gtk', '3.0');
let initialized = false;

function getGtk(): typeof globalThis.Gtk {
  if (!initialized) {
    nodeGtk.startLoop();
    Gtk.init();
    initialized = true;
  }
  return Gtk;
}

export default getGtk();
