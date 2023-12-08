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

import {
  GirModule,
  GirClassElement,
  GirInterfaceElement,
} from '@ts-for-gir/lib';
import { loadGtkModule } from './module';
import { renderWidgetElement } from './renderWidgetElement';
import { renderInterfaceElement } from './renderInterfaceElement';
import path from 'path';
import fs from 'fs/promises';
import { Property } from './components/InterfaceElement';

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
    await this.generateInterfaces();
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
    console.log(this.options);
    console.log(this.outDir);
  }

  async generateTypes() {
    if (typeof this.module === 'undefined') await this.load();
    const interfaces = await this.getInterfaces();
    await Promise.all(
      interfaces.map(async (interface_) => {
        this.generateInterface(interface_);
      }),
    );
  }

  async generateWidget(widget: GirClassElement) {
    const code = await renderWidgetElement(widget, {
      importElementPath: '../../elements/Element',
    });
    await fs.mkdir(this.outDir, { recursive: true });
    await fs.writeFile(path.resolve(this.outDir, `${widget.$.name}.tsx`), code);
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

  async generateInterfaces() {
    if (typeof this.module === 'undefined') await this.load();
    const interfaces = await this.getInterfaces();
    await Promise.all(
      interfaces.map(async (interface_) => {
        this.generateInterface(interface_);
      }),
    );
  }

  async getInterfaces() {
    if (typeof this.module === 'undefined') await this.load();
    return this.module.ns.interface || [];
  }

  async generateInterface(interface_: GirInterfaceElement) {
    const properties = this.getProperties(interface_)?.filter(
      (property) => property,
    ) as Property[];
    const code = await renderInterfaceElement({
      properties,
      name: interface_.$.name,
    });
    await fs.mkdir(path.resolve('src/generated/interfaces'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve(
        path.resolve('src/generated/interfaces'),
        `${interface_.$.name}.tsx`,
      ),
      code,
    );
  }

  private getProperties(interface_: GirInterfaceElement) {
    return interface_.property?.map((property) => ({
      name: property.$.name.replace(/-/g, '_'),
      type:
        property.type && property.type[0]?.$.name
          ? this.getType(property.type[0].$.name)
          : undefined,
    }));
  }

  private getType(type: string) {
    switch (type) {
      case 'gchar':
        return 'string';
      case 'gint':
        return 'number';
      case 'gboolean':
        return 'boolean';
      case 'gfloat':
        return 'number';
      case 'utf8':
        return 'string';
      default:
        return type;
    }
  }
}

export enum Kind {
  Elements = 'elements',
  Types = 'types',
}
