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
import { GirClassElement } from '@ts-for-gir/lib';
import {
  CallExpression,
  Class,
  ClassMethod,
  DeclarationType,
  Export,
  Expression,
  Identifier,
  Import,
  Interface,
  InterfaceDeclaration,
  ModuleDeclaration,
  NewExpression,
  PropertySignature,
  TypeReference,
} from 'react-ast';

export interface WidgetElementProps {
  widget: GirClassElement;
}

export function WidgetElement({ widget }: WidgetElementProps) {
  const name = widget.$.name;
  const interfaceName = `${name}Props`;

  return (
    <>
      <Import from="../../elements/Element" imports={['Element']} />
      <Import from="../../style" imports={['StyleProps']} />
      <Import from="../../types" imports={['PublicInstance']} />
      <Import from="@girs/node-gtk-4.0" default="Gtk" />
      <Import from="react" imports={['ReactNode', 'Ref']} />
      <Import
        from={`../interfaces/${name}GObjectProps`}
        imports={`${name}GObjectProps`}
      />
      <Export>
        <Interface
          name={interfaceName}
          extends={
            <>
              <Expression identifiers="StyleProps" />
              <Expression identifiers={`${name}GObjectProps`} />
            </>
          }
        >
          <PropertySignature
            name="children"
            optional
            typeAnnotation="ReactNode"
          />
          <PropertySignature
            name="ref"
            optional
            typeAnnotation={`Ref<PublicInstance<Gtk.${name}>>`}
          />
          {/* {signals?.map((signal) => (
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
          ))} */}
        </Interface>
      </Export>
      <ModuleDeclaration declaration={DeclarationType.Declare} name="global">
        <ModuleDeclaration declaration={DeclarationType.Namespace} name="JSX">
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
