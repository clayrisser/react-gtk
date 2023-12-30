/**
 * File: /src/components/NamespaceInterface.tsx
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
import { GirInterfaceElement } from '@ts-for-gir/lib';
import {
  ArrayExpression,
  Export,
  Import,
  InterfaceDeclaration,
  PropertySignature,
  TypeAnnotation,
  TypeReference,
} from 'react-ast';
import { TypeDefinition, importTypeMap, lookupType } from '../typeUtil';
import camelCase from 'lodash.camelcase';

export interface NamespaceInterfaceProps {
  interface_: GirInterfaceElement;
}

export function NamespaceInterface({ interface_ }: NamespaceInterfaceProps) {
  const properties = getInterfacePropertyPropDefinition(interface_);
  const imports = new Set<string>();
  properties?.forEach((property) => {
    if (property.type instanceof TypeDefinition) {
      addImport(property.type);
    } else if (Array.isArray(property.type)) {
      property.type.forEach((type) => {
        addImport(type);
      });
    }
  });

  function addImport(type: TypeDefinition) {
    if (!(type instanceof TypeDefinition)) return;
    if (type.importDefault) {
      imports.add(type.importDefault);
    } else if (type.importAs) {
      imports.add(type.importAs);
    }
  }

  function renderImports() {
    return [...imports].map((import_) => {
      if (!importTypeMap[import_]) return null;
      return (
        <Import
          key={import_}
          from={importTypeMap[import_].from}
          imports={[import_]}
        />
      );
    });
  }

  function renderPropertySignature() {
    return properties
      ?.map((property) => {
        let type: string | string[] | undefined;
        if (Array.isArray(property.type)) {
          type = property.type.map((type) => type.type);
        } else if (property.type instanceof TypeDefinition) {
          type = property.type.type;
        }
        if (!property.type) return null;

        return (
          <PropertySignature
            key={property.name}
            name={property.name}
            typeAnnotation={
              Array.isArray(type) ? (
                <TypeAnnotation>
                  <ArrayExpression>
                    {type.map((t, index) => (
                      <TypeReference key={index} name={t} />
                    ))}
                  </ArrayExpression>
                </TypeAnnotation>
              ) : (
                <TypeAnnotation>{type}</TypeAnnotation>
              )
            }
          />
        );
      })
      .filter(Boolean);
  }

  return (
    <>
      {Array.from(imports).includes('Gtk') && (
        <Import from="@girs/node-gtk-4.0" default="Gtk" />
      )}
      {renderImports()}
      <Export>
        <InterfaceDeclaration name={`${interface_.$.name}GObjectProps`}>
          {renderPropertySignature()}
        </InterfaceDeclaration>
      </Export>
    </>
  );
}

function getInterfacePropertyPropDefinition(interface_: GirInterfaceElement) {
  return interface_.method
    ?.filter((m) => m.$.name.startsWith('set_'))
    .filter(Boolean)
    ?.map((m) => {
      let type: TypeDefinition | TypeDefinition[] | undefined;
      const parameters = m.parameters?.[0]?.parameter
        ?.map((p) => {
          if (p.type?.[0].$.name)
            return {
              name: p.$.name,
              type: p.type?.[0].$.name,
            };
          return undefined;
        })
        .filter(Boolean);
      if (parameters && parameters.length) {
        if (parameters.length > 1) {
          type = parameters.map((p) => new TypeDefinition(lookupType(p!.type)));
        } else {
          type = new TypeDefinition(lookupType(parameters[0]!.type));
        }
      }
      return {
        name: camelCase(m.$.name.replace(/^set_/, '')),
        parameters,
        type,
      };
    });
}
