/*
 *  File: /src/oldGenerator.ts
 *  Project: @react-gtk/generate
 *  File Created: 06-12-2023 06:15:12
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { GirClassProps } from './types';

export class Generator {
  public nameSpaces: string[] = [];
  public widgetClasses: GirClassProps[] = [];
  public methods: string[] = [];
  public properties: string[] = [];
  protected log = console;

  constructor(private girFilePath: string) {}

  async generate() {
    console.log('HELLO');
    // const parsedData = await this.getParsedData();
    // this.getNameSpaces(parsedData);
    // this.getClasses(parsedData);
    // this.getMethods(parsedData);
    // this.getProperties(parsedData);
  }

  // protected async getParsedData() {
  //   const filePath = resolve(__dirname, this.girFilePath);
  //   const fileContents = await readFile(filePath, 'utf8');
  //   return await parseStringPromise(fileContents);
  // }

  // protected getNameSpaces(parsedData: any) {
  //   const nameSpaceData = parsedData.repository.namespace;
  //   for (const nameSpace of nameSpaceData) {
  //     this.nameSpaces.push(nameSpace);
  //   }
  // }

  // protected getClasses(parsedData: any) {
  //   const nameSpaceData = parsedData.repository.namespace;

  //   for (const nameSpace of nameSpaceData) {
  //     const widgetClasses = nameSpace.class.filter((classData: GirClassProps) =>
  //       classData.$.name.includes('Widget'),
  //     );

  //     this.widgetClasses.push(...widgetClasses);
  //   }
  // }

  // protected async getMethods(parsedData: any) {
  //   const nameSpaceData = parsedData.repository.namespace;

  //   for (const nameSpace of nameSpaceData) {
  //     const widgetClasses = nameSpace.class.filter((classData: GirClassProps) =>
  //       classData.$.name.includes('Widget'),
  //     );

  //     const methods = widgetClasses.map((classData: GirClassProps) => {
  //       return classData.method;
  //     });

  //     this.methods.push(...methods);
  //   }
  // }

  // protected async getProperties(parsedData: any) {
  //   const nameSpaceData = parsedData.repository.namespace;

  //   for (const nameSpace of nameSpaceData) {
  //     const widgetClasses = nameSpace.class.filter((classData: GirClassProps) =>
  //       classData.$.name.includes('Widget'),
  //     );

  //     const properties = widgetClasses.map((classData: any) => {
  //       return classData.property;
  //     });

  //     this.properties.push(...properties);
  //   }
  // }

  // get logger() {
  //   return {
  //     nameSpaceLogger: () => {
  //       this.nameSpaces.forEach((nameSpace: any) => {
  //         this.log.log(nameSpace);
  //       });
  //     },
  //     classLogger: () => {
  //       this.widgetClasses.forEach((classData: GirClassProps) => {
  //         this.log.log(classData);
  //       });
  //     },
  //     methodLogger: () => {
  //       this.methods.forEach((methodData: any) => {
  //         this.log.log(methodData);
  //       });
  //     },
  //     propertyLogger: () => {
  //       this.properties.forEach((propertyData: any) => {
  //         this.log.log(propertyData);
  //       });
  //     },
  //   };
  // }
}
