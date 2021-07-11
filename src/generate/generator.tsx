/**
 * File: /src/generate/generator.ts
 * Project: react-gtk
 * File Created: 10-07-2021 22:34:48
 * Author: Clay Risser <email@clayrisser.com>
 * -----
 * Last Modified: 10-07-2021 22:47:16
 * Modified By: Clay Risser <email@clayrisser.com>
 * -----
 * Silicon Hills LLC (c) Copyright 2021
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
import { render } from 'react-ast';
import { GtkGir } from './gir';
import { Klass, Namespace } from './types';
import { Element } from './components';

const logger = console;

export default class Generator {
  private generatorConfig: GeneratorConfig;

  constructor(
    private gtkGir: GtkGir,
    generatorConfig: Partial<GeneratorConfig> = {}
  ) {
    this.generatorConfig = {
      ...generatorConfig
    };
  }

  static async create(generatorConfig?: GeneratorConfig): Promise<Generator> {
    return new Generator(await GtkGir.create(), generatorConfig);
  }

  async generate() {
    return (
      await Promise.all(
        this.gtkGir.namespaces.map(async (namespace: Namespace) => {
          return Promise.all(
            namespace.klasses.map(async (klass: Klass) => {
              return this.generateKlass(klass);
            })
          );
        })
      )
    ).flat();
  }

  async generateKlass(klass: Klass) {
    return render(<Element klass={klass} />, {
      prettier: { parser: 'babel' },
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
  }
}

export interface GeneratorConfig {}
