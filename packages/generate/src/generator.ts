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
  GirFunctionElement,
  GirEnumElement,
} from '@ts-for-gir/lib';
import { loadGtkModule } from './module';
import { renderWidgetElement } from './renderWidgetElement';
import { renderFunctionElement } from './renderFunctionElement';
import { renderInterfaceElement } from './renderInterfaceElement';
import path from 'path';
import fs from 'fs/promises';
import { Method, ParamType, Property } from './components/InterfaceElement';
import { renderEnumElement } from './renderEmumElements';

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
    await this.generateFunctions();
    await this.generateEnums();
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

  async generateFunctions() {
    if (typeof this.module === 'undefined') await this.load();
    const functions = await this.getFunctions();
    await Promise.all(
      functions.map(async (function_) => {
        await this.generateFunction(function_);
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

  async generateFunction(function_: GirFunctionElement) {
    const code = await renderFunctionElement({ name: function_.$.name });
    await fs.mkdir(path.resolve('src/generated/functions'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve('src/generated/functions', `${function_.$.name}.tsx`),
      code,
    );
  }

  async getFunctions() {
    if (typeof this.module === 'undefined') await this.load();
    return this.module.ns.function || [];
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
    const methods = this.getMethodsOfInterface(interface_);
    const properties = this.getProperties(interface_)?.filter(
      (property) => property,
    ) as Property[];
    const code = await renderInterfaceElement({
      properties,
      name: interface_.$.name,
      methods,
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

  async generateEnums() {
    if (typeof this.module === 'undefined') await this.load();
    const enums = await this.getEnums();
    await Promise.all(
      enums.map(async (enum_) => {
        await this.generateEnum(enum_);
      }),
    );
  }

  async getEnums() {
    if (typeof this.module === 'undefined') await this.load();
    return this.module.ns.enumeration || [];
  }

  async generateEnum(enum_: GirEnumElement) {
    const members = enum_.member?.map((member) => member.$.name) || [];
    const code = await renderEnumElement({
      name: enum_.$.name,
      members,
    });
    await fs.mkdir(path.resolve('src/generated/enums'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve(path.resolve('src/generated/enums'), `${enum_.$.name}.tsx`),
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

  private getMethodsOfInterface(interface_: GirInterfaceElement) {
    const methods: Method[] = [];
    interface_.method?.forEach((method) => {
      const params: ParamType[] =
        method.parameters?.[0].parameter?.map((parameter) => {
          return {
            name:
              parameter.$.name === '...' ? '_' : (parameter.$.name as string),
            type: this.getType(parameter.type?.[0].$.name),
          };
        }) || [];
      methods.push({
        name: method.$.name,
        returnType: this.getType(method['return-value']?.[0].type?.[0].$.name),
        params,
      });
    });
    return methods;
  }

  private getType(type: string | undefined) {
    if (typeof type === 'undefined') return 'unknown';
    switch (type) {
      case 'gchar':
        return 'string';
      case 'gint':
        return 'number';
      case 'gboolean':
        return 'boolean';
      case 'gpointer':
        return 'any';
      case 'gfloat':
        return 'number';
      case 'utf8':
        return 'string';
      case 'gdouble':
        return 'number';
      case 'glong':
        return 'number';
      case 'gulong':
        return 'number';
      case 'gshort':
        return 'number';
      case 'gushort':
        return 'number';
      case 'guint':
        return 'number';
      case 'gsize':
        return 'number';
      case 'none':
        return 'void';
      default:
        return type;
    }
  }
}

export enum Kind {
  Elements = 'elements',
  Types = 'types',
}
