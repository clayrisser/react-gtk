/**
 * File: /src/components/FunctionElement.tsx
 * Project: @react-gtk/generate
 * File Created: 08-12-2023 14:23:01
 * Author: HariKrishna
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
import {
  Export,
  Identifier,
  TypeAnnotation,
  VariableDeclarator,
  FunctionDeclaration,
  VariableDeclaration,
  VariableDeclarationKind,
  AwaitExpression,
  CallExpression,
} from 'react-ast';

export interface FunctionElementProps {
  name: string;
}

export function FunctionElement({ name }: FunctionElementProps) {
  return (
    <Export>
      <FunctionDeclaration
        name={name}
        async
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A" key="A">
            a
          </Identifier>,
          <Identifier typeAnnotation="B" key="B">
            b
          </Identifier>,
        ]}
      >
        <VariableDeclaration kind={VariableDeclarationKind.Const}>
          <VariableDeclarator
            name="hello"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            key="await"
          >
            <AwaitExpression>
              <CallExpression name="fetch" arguments={['url']} />
            </AwaitExpression>
          </VariableDeclarator>
        </VariableDeclaration>
      </FunctionDeclaration>
    </Export>
  );
}
