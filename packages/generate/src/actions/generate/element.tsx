import React from 'react';
import {
  CallExpression,
  ClassDeclaration,
  ClassProperty,
  Constructor,
  ExportDefaultDeclaration,
  ImportDeclaration,
  Literal,
  Param,
  render
} from 'react-ast';

export default function generateElement(name: string): string {
  return render(
    <>
      <ImportDeclaration exports={['WeakValidationMap']} source="react" />
      <ImportDeclaration
        exports={['BaseElement', 'Gtk', 'Props']}
        source="@react-gtk/core"
      />
      <ExportDefaultDeclaration>
        <ClassDeclaration name={name} superClassName="BaseElement<Gtk.Box>">
          <ClassProperty static name="defaultProps" type="Props">
            <Literal>{{}}</Literal>
          </ClassProperty>
          <ClassProperty static name="propTypes" type="WeakValidationMap<any>">
            <Literal>{{}}</Literal>
          </ClassProperty>
          <Constructor
            params={[
              <Param type="Props" default={<Literal>{{}}</Literal>}>
                props
              </Param>
            ]}
          >
            <CallExpression
              name="super"
              arguments={['new Gtk.Box()', 'props']}
            />
          </Constructor>
        </ClassDeclaration>
      </ExportDefaultDeclaration>
    </>,
    {
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      },
      prettier: {
        singleQuote: true
      }
    }
  );
}
