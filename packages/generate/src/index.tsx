/**
 * File: /src/index.tsx
 * Project: @react-gtk/generate
 * File Created: 04-12-2023 12:04:53
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

import { parseStringPromise } from 'xml2js';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

export class Generator {
  public nameSpaces: string[] = [];
  public classes: string[] = [];
  public methods: string[] = [];
  public properties: string[] = [];

  constructor(private girPath: string) {}

  async start() {
    const parsedData = await this.getParsedData();
    this.getNameSpaces(parsedData);
    this.getClasses(parsedData);
    this.getMethods(parsedData);
    this.getProperties(parsedData);
  }

  protected async getParsedData() {
    const filePath = resolve(__dirname, this.girPath);
    const fileContents = await readFile(filePath, 'utf8');
    return await parseStringPromise(fileContents);
  }

  protected getNameSpaces(parsedData: any) {
    const nameSpaceData = parsedData.repository.namespace;
    for (const nameSpace of nameSpaceData) {
      this.nameSpaces.push(nameSpace);
    }
  }

  protected getClasses(parsedData: any) {
    const nameSpaceData = parsedData.repository.namespace;

    for (const nameSpace of nameSpaceData) {
      const widgetClasses = nameSpace.class.filter(
        // (classData: any) => classData.$.name === 'Widget',
        (classData: any) => classData.$.name.includes('Widget'),
      );

      this.classes.push(...widgetClasses);
    }
  }

  protected async getMethods(parsedData: any) {
    const nameSpaceData = parsedData.repository.namespace;

    for (const nameSpace of nameSpaceData) {
      const widgetClasses = nameSpace.class.filter((classData: any) =>
        classData.$.name.includes('Widget'),
      );

      const methods = widgetClasses.map((classData: any) => {
        return classData.method;
      });

      this.methods.push(...methods);
    }
  }

  protected async getProperties(parsedData: any) {
    const nameSpaceData = parsedData.repository.namespace;

    for (const nameSpace of nameSpaceData) {
      const widgetClasses = nameSpace.class.filter((classData: any) =>
        classData.$.name.includes('Widget'),
      );

      const properties = widgetClasses.map((classData: any) => {
        return classData.property;
      });

      this.properties.push(...properties);
    }
  }
}

class __main__ {
  static async main() {
    const generator = new Generator('/usr/share/gir-1.0/Gtk-4.0.gir');
    await generator.start();
    console.log(generator.methods);
  }
}

__main__.main();
