import { WeakValidationMap } from 'react';
import { BaseElement, Gtk, Props } from '@react-gtk/core';

export default class Box extends BaseElement<Gtk.Box> {
  static defaultProps: Props = {};

  static propTypes: WeakValidationMap<any> = {};

  constructor(props: Props = {}) {
    super(new Gtk.Box(), props);
  }
}
