import { WeakValidationMap } from 'react';
import { BaseElement, Gtk, Props } from '@react-gtk/core';

export default class Label extends BaseElement<Gtk.Label> {
  static defaultProps: Props = {};

  static propTypes: WeakValidationMap<any> = {};

  constructor(props: Props = {}) {
    super(new Gtk.Label(), props, {
      propMap: { children: 'label' },
    });
  }
}
