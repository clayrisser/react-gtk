import { WeakValidationMap } from 'react';
import { BaseElement, Gtk, Props } from '@react-gtk/core';

export default class Window extends BaseElement<Gtk.Window> {
  static defaultProps: Props = {};

  static propTypes: WeakValidationMap<any> = {};

  constructor(props: Props = {}) {
    super(new Gtk.Window(), props);
  }
}
