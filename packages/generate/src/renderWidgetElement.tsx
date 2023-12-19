/**
 * File: /src/renderWidgetElement.tsx
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
import camelCase from 'lodash.camelcase';
import { GirClassElement } from '@ts-for-gir/lib';
import {
  ExportAllWidgets,
  WidgetElement,
  WidgetElementExports,
  WidgetElementProps,
} from './components/WidgetElement';
import { render } from 'react-ast';

export interface RenderWidgetElementOptions
  extends Omit<WidgetElementProps, 'name'> {}

export async function renderWidgetElement(
  widget: GirClassElement,
  options: RenderWidgetElementOptions = {},
) {
  const signalProps = widget['glib:signal']?.map((s) =>
    camelCase(`on-${s.$.name}`),
  );
  if (signalProps?.length) {
    // console.log(`${widget.$.name} signalProps`, signalProps);
    // TODO: this is how to title case from the camel case (this should happen in the WidgetElement)
    // console.log(signalProps.map((s) => s.slice(2)));
  }
  return render(
    <WidgetElement
      name={widget.$.name}
      importElementPath={options.importElementPath}
      signals={options.signals}
    />,
  );
}

export async function renderWidgetElementExports(widgets: GirClassElement[]) {
  return render(<WidgetElementExports widgets={widgets} />);
}

export async function renderExportAllWidgets(widgets: GirClassElement[]) {
  return render(<ExportAllWidgets widgets={widgets} />);
}
