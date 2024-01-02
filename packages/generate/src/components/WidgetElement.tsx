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
  BlockStatement,
  CallExpression,
  Class,
  ClassMethod,
  DeclarationType,
  Export,
  Expression,
  Identifier,
  Import,
  InterfaceDeclaration,
  IntersectionType,
  ModuleDeclaration,
  NewExpression,
  PropertySignature,
  TypeAliasDeclaration,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
} from 'react-ast';
import { TypeDefinition } from '../typeUtil';

export interface WidgetElementProps {
  widget: GirClassElement;
}

export function WidgetElement({ widget }: WidgetElementProps) {
  const name = widget.$.name;
  const interfaceName = `${name}Props`;
  const importsSet = new Set<string>([
    'Element',
    'StyleProps',
    'PublicInstance',
    'Gtk',
    'ReactNode',
    'Ref',
    `${name}GObjectProps`,
  ]);
  const imports: TypeDefinition[] =
    widget.implements?.reduce((acc: TypeDefinition[], implement_) => {
      if (implement_.$.name.includes('.')) {
        const [import_] = implement_.$.name.split('.');
        if (!importsSet.has(import_)) {
          importsSet.add(import_);
          acc.push(new TypeDefinition(implement_.$.name));
        }
      }
      return acc;
    }, []) || [];

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
      {imports.map((import_) => {
        if (!import_.importDefault) return null;
        return (
          <Import
            from={import_.importFrom}
            default={import_.importDefault}
            key={import_.importDefault}
          />
        );
      })}
      {widget.implements?.map((implement_, i) => {
        const interfaceName = `${implement_.$.name}GObjectProps`;
        if (interfaceName.includes('.')) return null;
        return (
          <Import
            from={`../interfaces/${interfaceName}`}
            imports={`${interfaceName}`}
            key={`${interfaceName}${i}`}
          />
        );
      })}

      <Export>
        <TypeAliasDeclaration name={interfaceName}>
          <IntersectionType>
            <BlockStatement>
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
            </BlockStatement>
            <Expression identifiers="StyleProps" />
            <Expression identifiers={`${name}GObjectProps`} />
            {widget.implements?.map((implement_, i) => {
              return (
                <TypeReference name="Partial" key={i}>
                  <TypeParameterInstantiation>
                    <TypeReference
                      name={`${implement_.$.name}${
                        implement_.$.name.includes('.') ? '' : 'GObjectProps'
                      }`}
                    />
                  </TypeParameterInstantiation>
                </TypeReference>
              );
            })}
          </IntersectionType>
        </TypeAliasDeclaration>
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
