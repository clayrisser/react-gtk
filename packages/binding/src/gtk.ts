import nodeGtk from 'node-gtk';

let initialized = false;

function getGtk(version: string = '3.0') {
  const Gtk = nodeGtk.require('Gtk', version);
  if (!initialized) {
    initialized = true;
    nodeGtk.startLoop();
    Gtk.init();
  }
  return Gtk;
}

export default getGtk();
