import React from 'react';
import { ExportNamedDeclaration, VariableDeclaration, render } from 'react-ast';
import { Element } from '../../gtkGir';

export default function generateElement(elements: Element[]): string {
  function renderConstants() {
    return elements.map((element: Element) => (
      <ExportNamedDeclaration>
        <VariableDeclaration kind="const" name={element.klass.name}>
          {element.klass.name}
        </VariableDeclaration>
      </ExportNamedDeclaration>
    ));
  }

  return render(<>{renderConstants()}</>, {
    parserOptions: {
      plugins: ['jsx', 'classProperties', 'typescript']
    },
    prettier: {
      singleQuote: true,
      trailingComma: 'none'
    }
  });
}
