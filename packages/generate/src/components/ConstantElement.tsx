/**
 * File: /src/components/ConstantElement.tsx
 * Project: @react-gtk/generate
 * File Created: 14-12-2023 11:38:14
 * Author: Pavan Kumar
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

import {
  Export,
  VariableDeclaration,
  VariableDeclarationKind,
  VariableDeclarator,
} from 'react-ast';
import React from 'react';

export interface ConstantType {
  name: string;
  value: string;
}

export interface ConstantsProps {
  constants: ConstantType[];
}

export const ConstantElement = ({ constants }: ConstantsProps) => {
  return constants.map((item) => (
    <Export key={item.name}>
      <VariableDeclaration kind={VariableDeclarationKind.Const}>
        <VariableDeclarator name={item.name}>{item.value}</VariableDeclarator>
      </VariableDeclaration>
    </Export>
  ));
};
