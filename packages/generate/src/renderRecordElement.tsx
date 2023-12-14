/**
 * File: /src/renderRecordElement.tsx
 * Project: @react-gtk/generate
 * File Created: 14-12-2023 12:14:20
 * Author: Lalit rajak
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
import { render } from 'react-ast';
import {
  RecordClassElement,
  RecordClassElementProps,
} from './components/RecordClassElement';
import {
  RecordInterfaceElement,
  RecordInterfaceElementProps,
} from './components/RecordInterfaceElement';

export function renderRecordClassElement({
  name,
  fields,
  imports,
}: RecordClassElementProps) {
  return render(
    <RecordClassElement name={name} fields={fields} imports={imports} />,
  );
}

export function renderRecordInterfaceElement({
  name,
  fields,
  imports,
}: RecordInterfaceElementProps) {
  return render(
    <RecordInterfaceElement name={name} fields={fields} imports={imports} />,
  );
}
