/**
 * File: /src/components/WidgetElement.tsx
 * Project: @react-gtk/generate
 * File Created: 22-12-2023 04:04:09
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
import { ImportType } from '../util';
import { Signal, WidgetElementInterfaceProps } from '../types';
import {
  Class,
  ClassMethod,
  Import,
  Interface,
  Identifier,
  Export,
  TypeReference,
  CallExpression,
  Expression,
  DeclarationType,
  ModuleDeclaration,
  PropertySignature,
  InterfaceDeclaration,
  MethodSignature,
  NewExpression,
} from 'react-ast';

export interface WidgetElementProps {
  name: string;
  extendedClass?: string;
  importElementPath?: string;
  signals?: Signal[];
  imports?: ImportType[];
  interfaceProps?: WidgetElementInterfaceProps[];
}

export function WidgetElement({
  name,
  signals,
  imports,
  interfaceProps,
}: WidgetElementProps) {
  const interfaceName = `${name}Props`;
  return (
    <>
      {imports?.map((import_, i) => (
        <Import
          key={`import_.from${i}`}
          from={import_.from}
          imports={import_.import}
          default={import_.default}
        />
      ))}
      <Export>
        <Interface
          name={interfaceName}
          extends={<Expression identifiers="StyleProps" />}
        >
          {[
            ...(interfaceProps || []),
            {
              name: 'children',
              type: 'ReactNode',
            },
            {
              name: 'ref',
              type: `Ref<PublicInstance<Gtk.${name}>>`,
            },
          ].map((interfaceProp) => (
            <PropertySignature
              name={interfaceProp.name}
              typeAnnotation={interfaceProp.type}
              key={interfaceProp.name}
            />
          ))}
          {signals?.map((signal) => (
            <MethodSignature
              name={signal.name}
              params={signal.params?.map((param) => (
                <Identifier key={param.name} typeAnnotation={param.type}>
                  {param.name}
                </Identifier>
              ))}
              key={signal.name}
              returnType={signal.returnType}
            />
          ))}
        </Interface>
      </Export>

      <ModuleDeclaration declaration={DeclarationType.Declare} name="global">
        <ModuleDeclaration declaration={DeclarationType.Namespace} name="jsx">
          <InterfaceDeclaration name="IntrinsicElements">
            <PropertySignature name={name} typeAnnotation={interfaceName} />
          </InterfaceDeclaration>
        </ModuleDeclaration>
      </ModuleDeclaration>

      <Export>
        <Class
          name={name}
          extends="Element"
          extendsTypeParameters={
            <>
              <TypeReference name={`Gtk.${name}`} />
              <TypeReference name={`${name}Props`} />
            </>
          }
        >
          <ClassMethod
            name="constructor"
            params={[
              <Identifier key="props" typeAnnotation={interfaceName}>
                props
              </Identifier>,
            ]}
          >
            <CallExpression
              name="super"
              arguments={[
                <NewExpression key={0} name={name}>
                  <Identifier>Gtk</Identifier>
                </NewExpression>,
                'props',
              ]}
            />
          </ClassMethod>
        </Class>
      </Export>
    </>
  );
}
