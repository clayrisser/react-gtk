/**
 * File: /src/example.tsx
 * Project: @react-gtk/generate
 * File Created: 05-12-2023 15:33:55
 * Author: dharmendra
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

// import React from 'react';
// import { Generator } from './index';
// import type { GirClassProps } from './types';
// import {
//   Code,
//   FunctionDeclaration,
//   TypeAnnotation,
//   Var,
//   VariableDeclaration,
//   VariableDeclarationKind,
//   VariableDeclarator,
//   render,
// } from 'react-ast';
// import path from 'path';
// import fs from 'fs-extra';

// export const Example = () => {
//   (async function JSGenerate() {
//     const generator = new Generator('../girs/test.4.0.gir');
//     await generator.start();
//     // console.log(generator.widgetClasses);

//     Array.from(generator.widgetClasses).forEach((girClass: any) => {
//       // console.log(JSON.stringify(girClass));
//       renderWidgetElement(girClass);
//     });
//   })();

//   const elementsDirectory = path.resolve(__dirname, '../elements');

//   async function renderWidgetElement(girClass: GirClassProps) {
//     const className = girClass.$.name;

//     const jsx = (
//       <FunctionDeclaration id="test">
//         <VariableDeclaration kind={VariableDeclarationKind.Const}>
//           <VariableDeclarator
//             id="greet"
//             // typeAnnotation={<TypeAnnotation>String</TypeAnnotation>}
//           >
//             Hello World
//           </VariableDeclarator>
//         </VariableDeclaration>
//       </FunctionDeclaration>
//     );

//     const code = render(jsx, {
//       parserOptions: {
//         plugins: ['jsx', 'classProperties', 'typescript'],
//       },
//     });
//     await fs.mkdirp(elementsDirectory);
//     await fs.writeFile(
//       path.resolve(elementsDirectory, `${className}.tsx`),
//       code,
//     );
//   }
// };

// (async () => {
//   console.log(Example());
// })();

export default null;
