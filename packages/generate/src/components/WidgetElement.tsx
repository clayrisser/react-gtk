/**
 * File: /src/components/WidgetElement.tsx
 * Project: @react-gtk/generate
 * File Created: 06-12-2023 07:27:49
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

import { GirClassElement } from '@ts-for-gir/lib';
import React from 'react';
import {
  Class,
  ClassMethod,
  Import,
  Var,
  VarKind,
  Code,
  Interface,
  Identifier,
  Export,
  ExportAllDeclaration,
  VariableDeclaration,
  StringLiteral,
  VariableDeclarationKind,
  ExportNamedDeclaration,
  VariableDeclarator,
  ExportSpecifier,
  ImportDeclaration,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  ObjectExpression,
  ObjectProperty,
  ClassProperty,
  AssignmentExpression,
} from 'react-ast';

export interface WidgetElementProps {
  name: string;
  extendedClass?: string;
  importElementPath?: string;
}
export interface WidgetElementExportsProps {
  widgets: GirClassElement[];
}

export interface ExportAllWidgetsProps {
  widgets: GirClassElement[];
}

export function WidgetElement({
  name,
  extendedClass = 'Element',
  importElementPath = '@react-gtk/core',
}: WidgetElementProps) {
  const interfaceName = `${name}Props`;
  return (
    <>
      <Import from={importElementPath} imports="Element" />
      <Import from="@girs/node-gtk-4.0" default="Gtk" />
      <Export>
        <Interface name={interfaceName} />
      </Export>
      <Export>
        <Class name={name} extends={extendedClass}>
          <ClassProperty id="node" typeAnnotation={`Gtk.${name}`} />
          <ClassMethod
            id="constructor"
            params={[
              <Identifier key="props" typeAnnotation={interfaceName}>
                props
              </Identifier>,
            ]}
          >
            <Var name="node" kind={VarKind.Const}>
              <Code>{`new Gtk.${name}()`}</Code>
            </Var>
            <Code>super(node,props)</Code>
            <AssignmentExpression left="this.node">
              <Identifier>node</Identifier>
            </AssignmentExpression>
          </ClassMethod>
        </Class>
      </Export>
    </>
  );
}

export const WidgetElementExports = ({
  widgets,
}: WidgetElementExportsProps) => {
  const widgetNames = widgets.map((widget) => widget.$.name);
  return (
    <>
      <ImportDeclaration
        importKind="type"
        specifiers={['Element']}
        source="../../elements/Element"
      />
      {widgets.map((widget) => (
        <Import
          key={widget.$.name}
          imports={widget.$.name}
          from={`./${widget.$.name}`}
        />
      ))}
      <ExportNamedDeclaration>
        <VariableDeclaration kind={VariableDeclarationKind.Const}>
          <VariableDeclarator
            id="elements"
            typeAnnotation={
              <TypeAnnotation debug>
                <TypeReference name="Record">
                  <TypeParameterInstantiation>
                    <TypeReference name="string" />
                    <TypeReference name="typeof Element" />
                  </TypeParameterInstantiation>
                </TypeReference>
              </TypeAnnotation>
            }
          >
            {/* <ObjectLiteral>{`{${widgetNames.join(', ')}}`}</ObjectLiteral> */}
            <ObjectExpression
              properties={[
                ...widgetNames.map((widgetName) => (
                  <ObjectProperty key={widgetName} name={widgetName} />
                )),
              ]}
            />
          </VariableDeclarator>
        </VariableDeclaration>
      </ExportNamedDeclaration>
      {widgets.map((widgets) => (
        <ExportAllDeclaration
          key={widgets.$.name}
          source={`./${widgets.$.name}`}
        />
      ))}
    </>
  );
};

export const ExportAllWidgets = ({ widgets }: ExportAllWidgetsProps) => {
  return (
    <>
      {widgets.map((widget) => (
        <Import
          key={widget.$.name}
          imports={`${widget.$.name}Props`}
          from={`./elements/${widget.$.name}`}
        />
      ))}
      {widgets.map((widget) => (
        <Export key={widget.$.name}>
          <VariableDeclaration
            kind={VariableDeclarationKind.Const}
            key={widget.$.name}
          >
            <VariableDeclarator id={widget.$.name}>
              <StringLiteral>{widget.$.name}</StringLiteral>
            </VariableDeclarator>
          </VariableDeclaration>
        </Export>
      ))}

      <ExportNamedDeclaration
        exportKind="type"
        specifiers={widgets.map((widget) => (
          <ExportSpecifier
            key={widget.$.name}
          >{`${widget.$.name}Props`}</ExportSpecifier>
        ))}
      />

      <ExportAllDeclaration source="../render" />
    </>
  );
};
