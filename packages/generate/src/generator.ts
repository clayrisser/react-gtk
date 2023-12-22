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

import camelCase from 'lodash.camelcase';
import fs from 'fs/promises';
import path from 'path';
import { GeneratorOptions, Signal } from './types';
import { lookupType } from './typeUtil';
import { lookupLibImport, ImportType } from './util';
import { loadGtkModule } from './module';
import { GirModule, GirClassElement } from '@ts-for-gir/lib';
import { renderPropsInterface } from './renderPropsInterface';
import {
  renderWidgetElement,
  renderWidgetElementExports,
} from './renderWidgetElement';

export class Generator {
  module!: GirModule;

  outDir: string;

  options: GeneratorOptions;

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
    await this.generateElements();
  }

  async generateElements() {
    if (typeof this.module === 'undefined') await this.load();
    const { widgets } = this;
    await fs.rm(this.outDir, { recursive: true, force: true });
    await fs.mkdir(path.resolve(this.outDir, 'elements'), { recursive: true });
    await Promise.all(
      this.widgets.map(async (widget) => {
        this.generateWidgetElement(widget);
      }),
    );
    const generateElementExportsCode =
      await renderWidgetElementExports(widgets);
    await fs.writeFile(
      path.resolve(this.outDir, 'elements/index.ts'),
      generateElementExportsCode,
    );
    // const generateExportAllWidgetsCode = await renderExportAllWidgets(widgets);
    // await fs.writeFile(
    //   path.resolve('src/generated/', 'index.ts'),
    //   generateExportAllWidgetsCode,
    // );
  }

  async generateWidgetElement(widget: GirClassElement) {
    await this.generatePropsInterface(widget);
    const { signals, imports: signalImports } = this.getSignals(widget);
    const imports = this.deduplicateImports([
      ...this.getImports(widget),
      ...signalImports,
    ]);
    const generateElementCode = await renderWidgetElement(widget, {
      importElementPath: '../../elements/Element',
      signals,
      imports,
    });
    await fs.writeFile(
      path.resolve(this.outDir, `elements/${widget.$.name}.tsx`),
      generateElementCode,
    );
  }

  async generatePropsInterface(class_: GirClassElement) {
    if (this.generatedPropsInterfaces.has(class_.$.name)) return;
    const generatePropsInterfaceCode = await renderPropsInterface(class_, {});
    await fs.mkdir(path.resolve(this.outDir, 'interfaces'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve(this.outDir, `interfaces/${class_.$.name}Props.ts`),
      generatePropsInterfaceCode,
    );
    this.generatedPropsInterfaces.add(class_.$.name);
    const parent = this.getParent(class_);
    if (!parent) return;
    await this.generatePropsInterface(parent);
  }

  getImports(_widget: GirClassElement) {
    const imports: ImportType[] = [
      { default: 'Gtk', from: '@girs/node-gtk-4.0' },
      {
        import: ['Element'],
        from: `${this.options.rootPath}/elements/Element`,
      },
      { import: ['PublicInstance'], from: `${this.options.rootPath}/types` },
      { import: ['ReactNode', 'Ref'], from: 'react' },
      { import: ['StyleProps'], from: `${this.options.rootPath}/style` },
    ];
    return imports;
  }

  getSignals(widget: GirClassElement) {
    const imports: ImportType[] = [];
    return {
      signals: widget['glib:signal']?.map((signal) => {
        const params = signal.parameters?.[0].parameter.map((parameter) => {
          const type = this.getTypeWithImports(
            parameter.type?.[0].$.name || '',
            imports,
          );
          return {
            name: parameter.$.name,
            type,
          };
        });
        const returnType = this.getTypeWithImports(
          signal['return-value']?.[0].type?.[0].$.name || '',
          imports,
        );
        return {
          name: camelCase(`on-${signal.$.name}`),
          returnType,
          params,
        } as Signal;
      }),
      imports,
    };
  }

  deduplicateImports(imports: ImportType[]) {
    return imports;
  }

  getTypeWithImports(type: string, imports?: ImportType[]) {
    if (type.includes('.') && imports) {
      const import_ = lookupLibImport(type.split('.')[0]);
      console.log(import_);
      if (import_) {
        this.addImport(imports, import_);
      }
    } else {
      const type_ = lookupType(type);
      if (type_ === type) {
        type = `Gtk.${type}`;
      } else {
        type = type_;
      }
    }
    return type;
  }

  getParent(class_: GirClassElement) {
    const parent = class_.$.parent;
    if (!parent) return;
    return this.classes.find((class_) => class_.$.name === parent);
  }

  get widgets() {
    const classes = this.classes;
    return classes.filter((class_) => this.isWidget(class_));
  }

  get classes() {
    return this.module.ns.class || [];
  }

  private isWidget(class_: GirClassElement): boolean {
    if (!class_.$.parent) return false;
    if (class_.$.parent === 'Widget') return true;
    const parent = this.getParent(class_);
    if (!parent) return false;
    return this.isWidget(parent);
  }

  private addImport(imports: ImportType[], import_: ImportType) {
    if (imports.find((imp) => imp.import === import_.import)) return;
    imports.push(import_);
  }
}
