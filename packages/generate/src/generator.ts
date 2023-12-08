/*
 *  File: /src/generator.ts
 *  Project: @react-gtk/generate
 *  File Created: 06-12-2023 07:11:07
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

import { GirModule, GirClassElement } from '@ts-for-gir/lib';
import { loadGtkModule } from './module';
import {
  renderExportAllWidgets,
  renderWidgetElement,
  renderWidgetElementExports,
} from './renderWidgetElement';
import path from 'path';
import fs from 'fs/promises';

export interface GeneratorOptions {
  outDir: string;
  kind: Kind;
}

export class Generator {
  module!: GirModule;

  outDir: string;

  options: GeneratorOptions;

  constructor(options: Partial<GeneratorOptions> = {}) {
    this.options = {
      outDir: path.resolve(process.cwd(), 'out'),
      kind: Kind.Elements,
      ...options,
    };
    this.outDir = path.resolve(this.options.outDir);
  }

  async load() {
    this.module = await loadGtkModule();
  }

  async generate() {
    if (typeof this.module === 'undefined') await this.load();
    if (this.options.kind === Kind.Elements) await this.generateElements();
  }

  async generateElements() {
    if (typeof this.module === 'undefined') await this.load();
    await fs.rm(this.outDir, { recursive: true, force: true });
    const widgets = await this.getWidgets();
    await Promise.all(
      widgets.map(async (widget) => {
        this.generateWidget(widget);
      }),
    );

    const generateElementExportsCode =
      await renderWidgetElementExports(widgets);
    await fs.writeFile(
      path.resolve(this.outDir, 'index.ts'),
      generateElementExportsCode,
    );

    const generateExportAllWidgetsCode = await renderExportAllWidgets(widgets);
    await fs.writeFile(
      path.resolve('src/generated/', 'index.ts'),
      generateExportAllWidgetsCode,
    );

    console.log(this.options);
    console.log(this.outDir);
  }

  async generateWidget(widget: GirClassElement) {
    const generateElementCode = await renderWidgetElement(widget, {
      importElementPath: '../../elements/Element',
    });

    await fs.mkdir(this.outDir, { recursive: true });

    await fs.writeFile(
      path.resolve(this.outDir, `${widget.$.name}.tsx`),
      generateElementCode,
    );
  }

  async getWidgets() {
    if (typeof this.module === 'undefined') await this.load();
    const classes = await this.getClasses();
    return classes.filter((class_) => class_.$.parent === 'Widget');
  }

  async getClasses() {
    if (typeof this.module === 'undefined') await this.load();
    return this.module.ns.class || [];
  }
}

export enum Kind {
  Elements = 'elements',
  Types = 'types',
}
