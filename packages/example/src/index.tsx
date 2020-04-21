import React from 'react';
import nodeGtk from 'node-gtk';
import render, { Hello, Howdy } from '@react-gtk/render';
import util from 'util';

const Gtk = nodeGtk.require('Gtk', '3.0');

console.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(
  <>
    <Hello />
    <Howdy />
  </>
);

console.log('\n\n======== RENDERED OUTPUT ========');
console.log(util.inspect(renderedOutput, false, null, true));
console.log('\n\n--------------');

nodeGtk.startLoop();
Gtk.init(null);

const window = new Gtk.Window();
window.setDefaultSize(800, 600);
window.setTitle('Test');
window.showAll();

Gtk.main();
