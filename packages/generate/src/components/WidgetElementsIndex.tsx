/**
 * File: /src/components/WidgetElementsIndex.tsx
 * Project: @react-gtk/generate
 * File Created: 22-12-2023 04:33:40
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
  ExportAllDeclaration,
  ExportNamedDeclaration,
  Import,
  ObjectExpression,
  Property,
  VariableDeclaration,
  VariableDeclarationKind,
  VariableDeclarator,
} from 'react-ast';

export interface WidgetElementsIndexProps {
  widgets: GirClassElement[];
}

export const WidgetElementsIndex = ({ widgets }: WidgetElementsIndexProps) => {
  const widgetNames = widgets.map((widget) => widget.$.name);
  return (
    <>
      {widgets.map((widget) => (
        <Import
          key={widget.$.name}
          imports={widget.$.name}
          from={`./${widget.$.name}`}
        />
      ))}
      <ExportNamedDeclaration>
        <VariableDeclaration kind={VariableDeclarationKind.Const}>
          <VariableDeclarator name="elements">
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
