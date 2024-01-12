/**
 * File: /src/components/PropsInterfaceDocs.tsx
 * Project: @react-gtk/generate
 * File Created: 12-01-2024 17:51:16
 * Author: dharmendra
 * -----
 * BitSpur (c) Copyright 2017 - 2024
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
  PropsInterfaceProps,
  getMethodPropDefinitions,
  getPropertyPropDefinitions,
} from './PropsInterface';
import { Literal, ObjectExpression, Property, StringLiteral } from 'react-ast';

export function InterfaceDocumentation({ class_ }: PropsInterfaceProps) {
  const comments: Record<string, Record<string, string[]>> = {};

  const propertyPropDefinitions = getPropertyPropDefinitions(class_);

  propertyPropDefinitions.forEach(({ name, comment }) => {
    if (comment) {
      comments[class_.$.name] = comments[class_.$.name] || {};
      comments[class_.$.name][name] = comment.split('\n');
    }
  });

  const methodPropDefinitions = getMethodPropDefinitions(class_);

  methodPropDefinitions.forEach(({ name, comment }) => {
    if (comment) {
      comments[class_.$.name] = comments[class_.$.name] || {};
      comments[class_.$.name][name] = comment.split('\n');
    }
  });

  return (
    <ObjectExpression>
      {propertyPropDefinitions.map(({ name }, i) => (
        <Property key={name + i} name={<StringLiteral>{name}</StringLiteral>}>
          <Literal>{comments[class_.$.name]?.[name]}</Literal>
        </Property>
      ))}
      {methodPropDefinitions.map(({ name }, i) => (
        <Property key={name + i} name={<StringLiteral>{name}</StringLiteral>}>
          <Literal>{comments[class_.$.name]?.[name]}</Literal>
        </Property>
      ))}
    </ObjectExpression>
  );
}
