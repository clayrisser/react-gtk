/*
 *  File: /src/generator.ts
 *  Project: @react-gtk/generate
 *  File Created: 22-12-2023 04:04:09
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

import fs from 'fs/promises';
import path from 'path';
import { GeneratorOptions } from './types';
import {
  GirModule,
  GirClassElement,
  GirInterfaceElement,
} from '@ts-for-gir/lib';
import { loadGtkModule } from './module';
import {
  renderInterface,
  renderPropsInterface,
  renderRootIndex,
  renderWidgetElement,
  renderWidgetElementsIndex,
} from './render';

export class Generator {
  module!: GirModule;

  outDir: string;

  options: GeneratorOptions;

  private _widgets?: GirClassElement[];

  private generatedPropsInterfaces: Set<string> = new Set();

  constructor(options: Partial<GeneratorOptions> = {}) {
    this.options = {
      outDir: path.resolve(process.cwd(), 'out'),
      rootPath: '../..',
      ...options,
    };
    this.outDir = path.resolve(this.options.outDir);
  }

  async load() {
    this.module = await loadGtkModule();
  }

  async generate() {
    if (typeof this.module === 'undefined') await this.load();
    await fs.rm(this.outDir, { recursive: true, force: true });
    await fs.mkdir(path.resolve(this.outDir, 'elements'), { recursive: true });
    await Promise.all([
      ...this.widgets.map(async (widget) => {
        await this.generateWidgetElement(widget);
        await this.generatePropsInterface(widget);
      }),
      ...(this.module.ns.interface?.map(async (interface_) => {
        await this.generateInterface(interface_);
      }) || []),
    ]);
    await this.generateWidgetElementsIndex();
  }

  async generateInterface(interface_: GirInterfaceElement) {
    const generateInterfaceCode = await renderInterface(interface_);
    await fs.mkdir(path.resolve(this.outDir, 'interfaces'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve(
        this.outDir,
        `interfaces/${interface_.$.name}GObjectProps.ts`,
      ),
      generateInterfaceCode,
    );
  }

  async generateWidgetElement(widget: GirClassElement) {
    const generateElementCode = await renderWidgetElement(widget);
    await fs.writeFile(
      path.resolve(this.outDir, `elements/${widget.$.name}.tsx`),
      generateElementCode,
    );
  }

  async generatePropsInterface(class_: GirClassElement) {
    if (this.generatedPropsInterfaces.has(class_.$.name)) return;
    const generatePropsInterfaceCode = await renderPropsInterface(class_);
    await fs.mkdir(path.resolve(this.outDir, 'interfaces'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve(this.outDir, `interfaces/${class_.$.name}GObjectProps.ts`),
      generatePropsInterfaceCode,
    );
    this.generatedPropsInterfaces.add(class_.$.name);
    const parent = this.getParent(class_);
    if (!parent) return;
    await this.generatePropsInterface(parent);
  }

  async generateRootIndex() {
    await fs.writeFile(
      path.resolve(this.outDir, 'index.ts'),
      await renderRootIndex(this.widgets),
    );
  }

  async generateWidgetElementsIndex() {
    await fs.writeFile(
      path.resolve(this.outDir, 'elements/index.ts'),
      await renderWidgetElementsIndex(this.widgets),
    );
  }

  private getParent(class_: GirClassElement) {
    const parent = class_.$.parent;
    if (!parent) return;
    return this.classes.find((class_) => class_.$.name === parent);
  }

  private get widgets() {
    if (this._widgets) return this._widgets;
    const classes = this.classes;
    this._widgets = classes.filter((class_) => this.isWidget(class_));
    return this._widgets;
  }

  private get classes() {
    return this.module.ns.class || [];
  }

  private isWidget(class_: GirClassElement): boolean {
    if (!class_.$.parent) return false;
    if (class_.$.parent === 'Widget') return true;
    const parent = this.getParent(class_);
    if (!parent) return false;
    return this.isWidget(parent);
  }
}
