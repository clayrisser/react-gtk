/**
 * File: /src/components/InterfaceElement.tsx
 * Project: @react-gtk/generate
 * File Created: 08-12-2023 10:50:11
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
  Identifier,
  Import,
  Interface,
  MethodSignature,
  PropertySignature,
} from 'react-ast';
import { ImportType } from '../generator';

export interface Property {
  name: string;
  type: string;
}

export type ParamType = Omit<Property, 'type'> &
  Partial<Pick<Property, 'type'>>;

export interface Method {
  name: string;
  params?: ParamType[];
  returnType: string;
  optional?: boolean;
}

export interface InterfaceElementProps {
  properties?: Property[];
  methods?: Method[];
  name: string;
  imports?: ImportType[];
}

export function InterfaceElement({
  properties,
  name,
  methods,
  imports,
}: InterfaceElementProps) {
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
        <Interface name={name}>
          {properties?.map((property, i) => (
            <PropertySignature
              name={property.name}
              typeAnnotation={property.type}
              key={property.name + i}
            />
          ))}
          {methods?.map((method) => (
            <MethodSignature
              name={method.name}
              key={method.name}
              params={method.params?.map((param, i) => (
                <Identifier typeAnnotation={param.type} key={param.name + i}>
                  {param.name}
                </Identifier>
              ))}
              returnType={method.returnType}
            />
          ))}
        </Interface>
      </Export>
    </>
  );
}
