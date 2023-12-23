/**
 * File: /src/components/PropsInterface.tsx
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

import camelCase from 'lodash.camelcase';
import { GirClassElement, GirMethodElement } from '@ts-for-gir/lib';
import React, { ReactNode } from 'react';
import {
  Export,
  ExpressionWithTypeArguments,
  Identifier,
  Import,
  Interface,
  InterfaceTypeReference,
  PropertySignature,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
} from 'react-ast';
import { lookupType, TypeDefinition } from '../typeUtil';

export interface PropsInterfaceProps {
  class_: GirClassElement;
}

export function PropsInterface({ class_ }: PropsInterfaceProps) {
  const extends_ =
    class_.$.parent && class_.$.parent !== 'GObject.InitiallyUnowned'
      ? `${class_.$.parent}Props`
      : undefined;
  const propDefinitions = getPropDefinitions(class_);

  function renderImports() {
    const importedNames = new Set<string>();
    const imports: ReactNode[] = [];
    if (extends_) {
      imports.push(
        <Import key={0} imports={[extends_]} from={`./${extends_}`} />,
      );
    }
    propDefinitions.forEach((propDefinition, i) => {
      (propDefinition.type.items || []).forEach(
        (typeDefinition: TypeDefinition) => {
          if (!typeDefinition.importFrom) return;
          const importedName =
            typeDefinition.importDefault || typeDefinition.importAs;
          if (!importedName || importedNames.has(importedName)) return;
          imports.push(
            <Import
              key={
                propDefinition.name +
                propDefinition.type.toString() +
                importedNames.size +
                i
              }
              default={typeDefinition.importDefault}
              imports={
                typeDefinition.importAs ? [typeDefinition.importAs] : undefined
              }
              from={typeDefinition.importFrom}
            />,
          );
          importedNames.add(importedName);
        },
      );
      if (!propDefinition.type.importFrom) return;
      const importedName =
        propDefinition.type.importDefault || propDefinition.type.importAs;
      if (!importedName || importedNames.has(importedName)) return;
      imports.push(
        <Import
          key={
            propDefinition.name +
            propDefinition.type.toString() +
            importedNames.size +
            i
          }
          default={propDefinition.type.importDefault}
          imports={
            propDefinition.type.importAs
              ? [propDefinition.type.importAs]
              : undefined
          }
          from={propDefinition.type.importFrom}
        />,
      );
      importedNames.add(importedName);
    });
    return imports;
  }

  function renderPropDefinitions() {
    return propDefinitions.map((propDefinition) => (
      <PropertySignature
        name={propDefinition.name}
        typeAnnotation={propDefinition.type.toString()}
        key={propDefinition.name}
      />
    ));
  }

  function renderExtendsInterface() {
    if (!extends_) return;
    const propsInterfaceOmit = propsInterfaceOmitMap[`${class_.$.name}Props`];
    if (!propsInterfaceOmit?.length) return <Identifier>{extends_}</Identifier>;
    return (
      <ExpressionWithTypeArguments key={0} name="Omit">
        <InterfaceTypeReference>{extends_}</InterfaceTypeReference>
        <InterfaceTypeReference>
          {propsInterfaceOmit.map((omit) => `'${omit}'`).join('|')}
        </InterfaceTypeReference>
      </ExpressionWithTypeArguments>
    );
  }

  return (
    <>
      {renderImports()}
      <Export>
        <Interface
          name={`${class_.$.name}Props`}
          extends={renderExtendsInterface()}
        >
          {renderPropDefinitions()}
        </Interface>
      </Export>
    </>
  );
}

export interface PropDefinition {
  method: GirMethodElement;
  name: string;
  parameters: string[];
  type: TypeDefinition;
}

export function getPropDefinitions(class_: GirClassElement): PropDefinition[] {
  return (class_.method || [])
    .filter((m) => m.$.name.startsWith('set_'))
    .map((m) => {
      const parameters = (m.parameters?.[0].parameter || [])
        .map((p) => p.type?.[0].$.name)
        .filter(Boolean)
        .map((t) => lookupType(t));
      if (!parameters.length) return null;
      return {
        method: m,
        name: camelCase(m.$.name.replace(/^set_/, '')),
        parameters,
        type:
          parameters.length === 1
            ? new TypeDefinition(parameters[0])
            : new TypeDefinition(
                'array',
                parameters.map((p) => new TypeDefinition(p)),
              ),
      };
    })
    .filter(Boolean) as PropDefinition[];
}

const propsInterfaceOmitMap: Record<string, string[]> = {
  IconViewProps: ['cursor'],
  MenuButtonProps: ['direction'],
  TreeViewProps: ['cursor'],
};
