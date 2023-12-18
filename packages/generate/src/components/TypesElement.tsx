/**
 * File: /src/components/TypesElement.tsx
 * Project: @react-gtk/generate
 * File Created: 15-12-2023 15:04:38
 * Author: Lalit rajak
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
import { Import, Interface, PropertySignature } from 'react-ast';

export interface TypesElementProps {
  types: string[];
}

export function TypesElement({ types }: TypesElementProps) {
  return (
    <>
      {types.map((type) => (
        <Import from="../generated" imports={[`${type}Props`]} key={type} />
      ))}
      <Interface name="IntrinsicElements">
        {types?.map((type, i) => (
          <PropertySignature
            name={type}
            typeAnnotation={`${type}Props`}
            key={type + i}
          />
        ))}
      </Interface>
    </>
  );
}
