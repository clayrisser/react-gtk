/**
 * File: /src/components/RecordClassElement.tsx
 * Project: @react-gtk/generate
 * File Created: 14-12-2023 12:16:44
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
import {
  Class,
  ClassProperty,
  ClassPropertyAccessibility,
  Export,
  Import,
  TypeAnnotation,
} from 'react-ast';
import { ImportType } from '../generator';

export interface Field {
  name: string;
  type?: string;
  accessibility?: ClassPropertyAccessibility;
}

export interface RecordClassElementProps {
  name: string;
  fields?: Field[];
  imports?: ImportType[];
}

export function RecordClassElement({
  name,
  fields,
  imports,
}: RecordClassElementProps) {
  return (
    <>
      {imports?.map((importItem) => (
        <Import
          key={importItem.import}
          from={importItem.from}
          imports={[importItem.import]}
        />
      ))}
      <Export>
        <Class name={name}>
          {fields?.map(({ name, type, accessibility }) => (
            <ClassProperty
              id={name}
              key={name}
              accessibility={accessibility}
              typeAnnotation={<TypeAnnotation>{type}</TypeAnnotation>}
            />
          ))}
        </Class>
      </Export>
    </>
  );
}
