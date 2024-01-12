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

import React, { ReactNode } from 'react';
import camelCase from 'lodash.camelcase';
import { lookupType, TypeDefinition } from '../typeUtil';
import {
  GirCallableParamElement,
  GirClassElement,
  GirMethodElement,
} from '@ts-for-gir/lib';
import {
  Export,
  ExpressionWithTypeArguments,
  Identifier,
  Import,
  Interface,
  InterfaceTypeReference,
  MethodSignature,
  PropertySignature,
} from 'react-ast';

export interface PropsInterfaceProps {
  class_: GirClassElement;
}

export function PropsInterface({ class_ }: PropsInterfaceProps) {
  // console.log('class_', class_.doc);
  const extends_: string[] = [];
  if (class_.$.parent && class_.$.parent !== 'GObject.InitiallyUnowned') {
    extends_.push(`${class_.$.parent}GObjectProps`);
  }
  class_.implements?.forEach((implement) => {
    extends_.push(`${implement.$.name.replace(/.+\./, '')}GObjectProps`);
  });
  const propertyPropDefinitions = getPropertyPropDefinitions(class_);
  const methodPropDefinitions = getMethodPropDefinitions(class_);

  function renderImports() {
    const importedNames = new Set<string>();
    const imports: ReactNode[] = extends_.map((extend, i) => (
      <Import key={extend + i} imports={[extend]} from={`./${extend}`} />
    ));
    propertyPropDefinitions.forEach(({ name, type }, i) => {
      (type.items || []).forEach((typeDefinition: TypeDefinition) => {
        if (!typeDefinition.importFrom) return;
        const importedName =
          typeDefinition.importDefault || typeDefinition.importAs;
        if (!importedName || importedNames.has(importedName)) return;
        imports.push(
          <Import
            key={name + type.toString() + importedNames.size + i}
            default={typeDefinition.importDefault}
            imports={
              typeDefinition.importAs ? [typeDefinition.importAs] : undefined
            }
            from={typeDefinition.importFrom}
          />,
        );
        importedNames.add(importedName);
      });
      if (!type.importFrom) return;
      const importedName = type.importDefault || type.importAs;
      if (!importedName || importedNames.has(importedName)) return;
      imports.push(
        <Import
          key={name + type.toString() + importedNames.size + i}
          default={type.importDefault}
          imports={type.importAs ? [type.importAs] : undefined}
          from={type.importFrom}
        />,
      );
      importedNames.add(importedName);
    });
    methodPropDefinitions.forEach(({ parameters }, i) => {
      parameters.forEach(({ name, type }) => {
        if (!type.importFrom) return;
        const importedName = type.importDefault || type.importAs;
        if (!importedName || importedNames.has(importedName)) return;
        imports.push(
          <Import
            key={name + type.toString() + importedNames.size + i}
            default={type.importDefault}
            imports={type.importAs ? [type.importAs] : undefined}
            from={type.importFrom}
          />,
        );
        importedNames.add(importedName);
      });
    });
    return imports;
  }

  function renderPropertyProps() {
    return propertyPropDefinitions.map(({ name, type }, i) => {
      return (
        <PropertySignature
          key={name + i}
          name={name}
          optional
          typeAnnotation={type.toString()}
        />
      );
    });
  }

  function renderMethodProps() {
    return methodPropDefinitions.map(({ name, parameters }, i) => {
      return (
        <MethodSignature
          key={name + i}
          name={name}
          optional
          returnType="void"
          params={parameters.map(({ name, type }, i) => (
            <Identifier key={name + i} typeAnnotation={type.toString()}>
              {name}
            </Identifier>
          ))}
        />
      );
    });
  }

  function renderExtendsInterface() {
    const propsInterfaceOmit =
      propsInterfaceOmitMap[`${class_.$.name}GObjectProps`];
    if (!propsInterfaceOmit?.length) {
      return extends_.map((extend, i) => (
        <Identifier key={extend + i}>{extend}</Identifier>
      ));
    }
    return (
      <ExpressionWithTypeArguments name="Omit">
        <InterfaceTypeReference>{extends_.join('&')}</InterfaceTypeReference>
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
          name={`${class_.$.name}GObjectProps`}
          extends={renderExtendsInterface()}
        >
          {renderPropertyProps()}
          {renderMethodProps()}
        </Interface>
      </Export>
    </>
  );
}

export function getPropertyPropDefinitions(
  class_: GirClassElement,
): PropertyPropDefinition[] {
  return (class_.method || [])
    .filter((m) => m.$.name.startsWith('set_'))
    .map((m) => {
      const parameters = (m.parameters?.[0].parameter || [])
        .map((p) => p.type?.[0].$.name)
        .filter(Boolean)
        .map((t) => lookupType(t));
      if (!parameters.length) return null;
      return {
        comment: m.doc?.[0]?._,
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
    .filter(Boolean) as PropertyPropDefinition[];
}

export function getMethodPropDefinitions(
  class_: GirClassElement,
): MethodPropDefinition[] {
  return (class_['glib:signal'] || []).map((s) => {
    const parameters =
      (s.parameters
        ?.map((p) => {
          const parameter = p.parameter?.[0];
          const type = parameter.type?.[0];
          if (!parameter || !type || !type.$.name) return null;
          return {
            name: camelCase(parameter.$.name),
            parameter,
            type: new TypeDefinition(lookupType(type.$.name)),
          } as MethodPropParameter;
        })
        .filter(Boolean) as MethodPropParameter[]) || [];
    return {
      comment: s.doc?.[0]?._,
      name: camelCase(`on-${s.$.name}`),
      parameters: [
        {
          name: 'node',
          type: new TypeDefinition(lookupType(class_.$.name)),
        },
        ...parameters,
      ],
    };
  });
}

export interface MethodPropParameter {
  name: string;
  parameter?: GirCallableParamElement;
  type: TypeDefinition;
}

export interface MethodPropDefinition {
  name: string;
  parameters: MethodPropParameter[];
  comment?: string;
}

export interface PropertyPropDefinition {
  method: GirMethodElement;
  name: string;
  parameters: string[];
  type: TypeDefinition;
  comment?: string;
}

const propsInterfaceOmitMap: Record<string, string[]> = {
  IconViewGObjectProps: ['cursor'],
  MenuButtonGObjectProps: ['direction'],
  TreeViewGObjectProps: ['cursor'],
};
