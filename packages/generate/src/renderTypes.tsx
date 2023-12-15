/**
 * File: /src/renderTypes.tsx
 * Project: @react-gtk/generate
 * File Created: 15-12-2023 15:03:45
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
import { TypesElement, TypesElementProps } from './components/TypesElement';

export async function renderTypesElement({ types }: TypesElementProps) {
  return render(<TypesElement types={types} />);
}
