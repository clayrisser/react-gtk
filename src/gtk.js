import nodeGtk from 'node-gtk';

function getGtk(version = '3.0') {
  const Gtk = nodeGtk.require('Gtk', version);
  let initialized = false;
  if (!initialized) {
    initialized = true;
    nodeGtk.startLoop();
    Gtk.init();
  }
  return Gtk;
}

export default getGtk();
