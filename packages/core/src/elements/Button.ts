/*
 *  File: /src/elements/Button.ts
 *  Project: @react-gtk/core
 *  File Created: 28-11-2023 23:41:23
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import Gtk from '@girs/node-gtk-4.0';
import type { Ref } from 'react';
import { Element } from './Element';
import { Instance } from '../types';
import { StyleProps } from '../style';

export interface ButtonProps extends StyleProps {
  label?: string;
  onClicked?: Gtk.Button.ClickedSignalCallback;
  ref?: Ref<Instance>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Button: ButtonProps;
    }
  }
}

export class Button extends Element {
  node: Gtk.Button;
  constructor(props: ButtonProps = {}) {
    const node = new Gtk.Button();
    super(node, props);
    this.node = node;
  }
}
