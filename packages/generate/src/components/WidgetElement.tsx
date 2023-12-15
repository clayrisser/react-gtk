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
  Interface,
  Identifier,
  Export,
  ExportAllDeclaration,
  VariableDeclaration,
  VariableDeclarationKind,
  ExportNamedDeclaration,
  VariableDeclarator,
  ExportSpecifier,
  ImportDeclaration,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  Literal,
  CallExpression,
  ClassProperty,
  AssignmentExpression,
  ObjectExpression,
  Property,
  Code,
} from 'react-ast';
import { ImportType } from '../generator';

export interface WidgetElementProps {
  name: string;
  extendedClass?: string;
  importElementPath?: string;
  extendedInterfaces?: string[];
  imports?: ImportType[];
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
  extendedInterfaces,
  imports,
}: WidgetElementProps) {
  const interfaceName = `${name}Props`;
  return (
    <>
      <Import from={importElementPath} imports="Element" />
      <Import from="@girs/node-gtk-4.0" default="Gtk" />
      {/* {imports?.map((import_) => (
        <Import
          key={import_.import}
          from={import_.from}
          imports={import_.import}
        />
      ))} */}
      <Code>{`export type ${name}Props =Gtk.${name} ${
        (extendedInterfaces?.length || 0) > 0 ? '&Gtk.' : ''
      }${extendedInterfaces?.join('&Gtk.')}`}</Code>

      {/* <Export>
        <Interface
          name={interfaceName}
          extends={extendedInterfaces?.map((extendedInterface) => (
            <Identifier key={extendedInterface}>{extendedInterface}</Identifier>
          ))}
        />
      </Export> */}
      <Export>
        <Class name={name} extends={extendedClass}>
          <ClassProperty name="node" typeAnnotation={`Gtk.${name}`} />
          <ClassMethod
            name="constructor"
            params={[
              <Identifier key="props" typeAnnotation={interfaceName}>
                props
              </Identifier>,
            ]}
          >
            <Var name="node" kind={VarKind.Const}>
              <CallExpression name={`new Gtk.${name}`} />
            </Var>
            <CallExpression name="super" arguments={['node', 'props']} />
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
            name="elements"
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
            <ObjectExpression>
              {widgetNames.map((widgetName: string, index: number) => (
                <Property name={widgetName} key={index} />
              ))}
            </ObjectExpression>
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
            <VariableDeclarator name={widget.$.name}>
              <Literal>{widget.$.name}</Literal>
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
