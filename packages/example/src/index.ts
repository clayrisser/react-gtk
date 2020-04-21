import nodeGtk from 'node-gtk';

const Gtk = nodeGtk.require('Gtk', '3.0');

nodeGtk.startLoop();
Gtk.init(null);

const window = new Gtk.Window();
window.setDefaultSize(800, 600);
window.setTitle('Test');
window.showAll();

Gtk.main();
