import React from 'react';
import {
  ExportNamedDeclaration,
  ImportDeclaration,
  InterfaceDeclaration,
  InterfaceProperty,
  render
} from 'react-ast';
import { Element } from '../../gtkGir';

export default function generateElement(elements: Element[]): string {
  function renderImports() {
    return elements.map((element: Element) => (
      <ImportDeclaration
        defaultExport={element.klass.name}
        source={`./${element.klass.name}`}
      />
    ));
  }

  function renderExports() {
    return (
      <ExportNamedDeclaration>
        {elements.map((element: Element) => element.klass.name)}
      </ExportNamedDeclaration>
    );
  }

  return render(
    <>
      <ImportDeclaration exports={['Instance']} source="@react-gtk/core" />
      <ImportDeclaration
        defaultExport="createElement"
        source="./createElement"
      />
      {renderImports()}
      <ExportNamedDeclaration>
        <InterfaceDeclaration name="Elements">
          <InterfaceProperty name="[key: string]" type="typeof Instance" />
        </InterfaceDeclaration>
      </ExportNamedDeclaration>
      {renderExports()}
    </>,
    {
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      },
      prettier: {
        singleQuote: true,
        trailingComma: 'none'
      }
    }
  );
}

/* import { Instance } from '@react-gtk/core';
 * import Box from './Box';
 * import Label from './Label';
 * import Window from './Window';
 * import createElement from './createElement';
 *
 * export interface Elements {
 *   [key: string]: typeof Instance;
 * }
 *
 * export * from './constants';
 * export * from './types';
 *
 * export { createElement };
 * export default { Box, Label, Window } as Elements; */
