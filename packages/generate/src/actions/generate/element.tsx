import React from 'react';
import {
  ClassDeclaration,
  ClassMethod,
  CallExpression,
  Param,
  ClassProperty,
  render
} from 'react-ast';

export default async function generateElement(name: string) {
  const code = render(
    <>
      <ClassDeclaration name={name} superClassName="BaseElement">
        <ClassProperty name="defaultProps" type="Props">
          a{'{}'}
        </ClassProperty>
        <ClassProperty name="defaultProps" type="WeakValidationMap<any>">
          a{'{}'}
        </ClassProperty>
        <ClassMethod
          name="constructor"
          params={[<Param type="Props">props</Param>]}
        >
          <CallExpression name="super" />
        </ClassMethod>
      </ClassDeclaration>
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
  console.log(code);
}

/* import { WeakValidationMap } from 'react';
 * import { BaseElement, Gtk, Props } from '@react-gtk/core';
 *
 * export default class Box extends BaseElement<Gtk.Box> {
 *   static defaultProps: Props = {};
 *
 *   static propTypes: WeakValidationMap<any> = {};
 *
 *   constructor(props: Props = {}) {
 *     super(new Gtk.Box(), props);
 *   }
 * } */
