/*
 *  File: /src/elements/Text.ts
 *  Project: @react-gtk/core
 *  File Created: 05-12-2023 15:08:55
 *  Author: HariKrishna
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
import { Element } from './Element';
import { TextInstance } from '../types';
// import { Text as GeneratedText } from '../generated/elements/Text';

export interface TextProps {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Text: TextProps;
    }
  }
}

// export class Text extends GeneratedText {
export class Text extends Element<Gtk.Text, TextProps> implements TextInstance<TextProps> {
  // resetText(options: Partial<ResetTextOptions>) {
  //   const { stage } = {
  //     parentIsContainer: false,
  //     stage: Stage.Update,
  //     ...options,
  //   } as ResetTextOptions;
  //   this.updateNode({ stage });
  //   // TODO: implement
  // }

  // updateText(_oldText: string, _newText: string, options: Partial<UpdateTextOptions>) {
  //   const { stage } = {
  //     parentIsContainer: false,
  //     stage: Stage.Update,
  //     ...options,
  //   } as ResetTextOptions;
  //   this.updateNode({ stage });
  //   // TODO: implement
  // }

  constructor(props?: TextProps) {
    super(new Gtk.Text(), props);
  }
}
