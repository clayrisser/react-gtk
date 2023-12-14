/**
 * File: /src/components/EnumElement.tsx
 * Project: @react-gtk/generate
 * File Created: 08-12-2023 10:50:11
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
import { EnumDeclaration, EnumMember, Export, StringLiteral } from 'react-ast';

export interface Property {
  name: string;
  type: string;
}

export interface Member {
  name: string;
  value?: string;
}

export interface EnumElementProps {
  members: Member[];
  name: string;
}

export function EnumElement({ members, name }: EnumElementProps) {
  return (
    <>
      <Export>
        <EnumDeclaration id={name}>
          {members?.map((member) => (
            <EnumMember key={member.name} name={member.name}>
              {member.value && <StringLiteral>{member.value}</StringLiteral>}
            </EnumMember>
          ))}
        </EnumDeclaration>
      </Export>

      {/* <Export>
        <Interface name={name}>
          {members?.map((member) => (
            <PropertySignature
              id={member}
              typeAnnotation="string"
              key={member}
            />
          ))}
        </Interface>
      </Export> */}
    </>
  );
}
