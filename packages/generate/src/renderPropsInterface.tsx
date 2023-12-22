/**
 * File: /src/renderPropsInterface.tsx
 * Project: @react-gtk/generate
 * File Created: 22-12-2023 05:03:47
 * Author: Clay Risser
 * -----
 * BitSpur (c) Copyright 2017 - 2023
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { GirClassElement } from '@ts-for-gir/lib';
import { render } from 'react-ast';
import {
  PropsInterface,
  PropsInterfaceProps,
} from './components/PropsInterface';

export type RenderPropsInterfaceOptions = Omit<PropsInterfaceProps, 'class_'>;

export async function renderPropsInterface(
  class_: GirClassElement,
  _options: RenderPropsInterfaceOptions = {},
) {
  return render(<PropsInterface class_={class_} />);
}
