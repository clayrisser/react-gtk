/**
 * File: /src/components/RecordInterfaceElement.tsx
 * Project: @react-gtk/generate
 * File Created: 14-12-2023 12:18:09
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
  Export,
  Import,
  Interface,
  PropertySignature,
  TypeAnnotation,
} from 'react-ast';
import { Field } from './RecordClassElement';
import { ImportType } from '../generator';

export interface RecordInterfaceElementProps {
  name: string;
  fields?: Field[];
  imports?: ImportType[];
}

export function RecordInterfaceElement({
  name,
  fields,
  imports,
}: RecordInterfaceElementProps) {
  return (
    <>
      {imports?.map((import_) => (
        <Import
          key={import_.import}
          from={import_.from}
          imports={[import_.import]}
        />
      ))}
      <Export>
        <Interface name={name}>
          {fields?.map(({ name, type }) => (
            <PropertySignature
              id={name}
              key={name}
              typeAnnotation={<TypeAnnotation>{type}</TypeAnnotation>}
            />
          ))}
        </Interface>
      </Export>
    </>
  );
}
