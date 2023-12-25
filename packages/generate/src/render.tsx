/**
 * File: /src/render.tsx
 * Project: @react-gtk/generate
 * File Created: 05-12-2023 16:43:03
 * Author: dharmendra
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
import { PropsInterface } from './components/PropsInterface';
import { RootIndex } from './components';
import { WidgetElement } from './components/WidgetElement';
import { WidgetElementsIndex } from './components/WidgetElementsIndex';
import { render } from 'react-ast';

export async function renderPropsInterface(class_: GirClassElement) {
  return render(<PropsInterface class_={class_} />);
}

export async function renderWidgetElement(widget: GirClassElement) {
  return render(<WidgetElement widget={widget} />);
}

export async function renderWidgetElementsIndex(widgets: GirClassElement[]) {
  return render(<WidgetElementsIndex widgets={widgets} />);
}

export async function renderRootIndex(widgets: GirClassElement[]) {
  return render(<RootIndex widgets={widgets} />);
}
