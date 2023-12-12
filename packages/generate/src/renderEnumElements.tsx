/**
 * File: /src/renderEnumElements.tsx
 * Project: @react-gtk/generate
 * File Created: 08-12-2023 14:33:09
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
import { EnumElement, Member } from './components/EnumElement';

export interface RenderInterfaceOptions {
  members: Member[];
  name: string;
}

export async function renderEnumElement({
  members,
  name,
}: RenderInterfaceOptions) {
  return render(<EnumElement members={members} name={name} />);
}
