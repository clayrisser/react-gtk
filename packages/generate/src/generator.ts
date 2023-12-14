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
  GirRecordElement,
} from '@ts-for-gir/lib';
import { loadGtkModule } from './module';
import {
  renderExportAllWidgets,
  renderWidgetElement,
  renderWidgetElementExports,
} from './renderWidgetElement';
import { renderFunctionElement } from './renderFunctionElement';
import { renderInterfaceElement } from './renderInterfaceElement';
import path from 'path';
import fs from 'fs/promises';
import { Method, ParamType, Property } from './components/InterfaceElement';
import { renderEnumElement } from './renderEnumElements';
import { Member } from './components/EnumElement';
import { renderRecordElement } from './renderRecordElements';
import { Field } from './components/RecordElement';
import { ClassPropertyAccessibility } from 'react-ast';

export interface GeneratorOptions {
  outDir: string;
  kind: Kind;
}

export interface Import {
  import: string;
  from: string;
  type?: 'type' | 'default';
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
    console.log('keys', Object.keys(this.module.ns));
  }

  async generate() {
    if (typeof this.module === 'undefined') await this.load();
    if (this.options.kind === Kind.Elements) await this.generateElements();
    await this.generateFunctions();
    await this.generateEnums();
    await this.generateInterfaces();
    await this.generateRecords();
  }

  async generateRecords() {
    if (typeof this.module === 'undefined') await this.load();
    const records = await this.getRecords();
    await Promise.all(
      records.map(async (record) => {
        await this.generateRecord(record);
      }),
    );
  }

  async getRecords() {
    if (typeof this.module === 'undefined') await this.load();
    return this.module.ns.record || [];
  }

  async getRecordFields(record: GirRecordElement) {
    return record.field?.map((field) => {
      const type = this.getType(field.type?.[0].$.name);

      // console.log(field.callback?.[0].parameters?.[0]);
      return {
        name: field.$.name,
        type,
        accessibility: ClassPropertyAccessibility.Public,
        ...(field.$.private === '1' && {
          accessibility: ClassPropertyAccessibility.Private,
        }),
      } as Field;
    });
  }

  async generateRecord(record: GirRecordElement) {
    const fields = await this.getRecordFields(record);
    // if (record.$.name.endsWith('Class')) {
    //   console.log('class', record);
    // }
    // if (record.$.name.endsWith('Interface')) {
    //   console.log('interface', record);
    // }
    console.log('records', record.$.name);
    console.log('');
    const code = await renderRecordElement({
      name: record.$.name,
      fields,
    });
    await fs.mkdir(path.resolve('src/generated/records'), {
      recursive: true,
    });
    await fs.writeFile(
      path.resolve('src/generated/records', `${record.$.name}.tsx`),
      code,
    );
  }

  async generateElements() {
    if (typeof this.module === 'undefined') await this.load();
    await fs.rm(this.outDir, { recursive: true, force: true });
    await fs.mkdir(this.outDir, { recursive: true });
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
    const generateElementCode = await renderWidgetElement(widget, {
      importElementPath: '../../elements/Element',
    });
    await fs.writeFile(
      path.resolve(this.outDir, `${widget.$.name}.tsx`),
      generateElementCode,
    );
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
    const { methods, imports: mImports } =
      await this.getMethodsOfInterface(interface_);
    let { properties, imports: pImports } = await this.getPropertiesOfInterface(
      interface_,
      mImports,
    );
    const imports = [...mImports, ...pImports].filter(
      (imp, index, self) =>
        self.findIndex((t) => t.import === imp.import) === index,
    );
    properties = properties.filter((property) => property);
    const code = await renderInterfaceElement({
      properties,
      name: interface_.$.name,
      methods,
      imports,
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

  async getPropertiesOfInterface(
    interface_: GirInterfaceElement,
    imports: Import[] = [],
  ): Promise<{ properties: Property[]; imports: Import[] }> {
    const properties: Property[] = [];
    const enums = await this.getEnums();
    await Promise.all(
      interface_.property?.forEach(async (property) => {
        let type: string | undefined;
        if (property.type && property.type[0]?.$.name) {
          type = this.getType(property.type[0].$.name);
          if (type === property.type[0]?.$.name) {
            await this.filterAndAddImport(imports, enums, type);
          }
        }
        if (typeof property.$.name !== 'undefined') {
          properties.push({
            name: property.$.name.replace(/-/g, '_'),
            type,
          } as Property);
        }
      }) || [],
    );
    return { properties, imports };
  }

  async getMethodsOfInterface(
    interface_: GirInterfaceElement,
    imports: Import[] = [],
  ) {
    const methods: Method[] = [];
    const enums = await this.getEnums();
    interface_.method?.forEach(async (method) => {
      const params: ParamType[] =
        method.parameters?.[0].parameter?.map((parameter) => {
          const type = this.getType(parameter.type?.[0].$.name);
          if (type === parameter.type?.[0].$.name) {
            this.filterAndAddImport(imports, enums, type);
          }
          return {
            name:
              parameter.$.name === '...' ? '_' : (parameter.$.name as string),
            type,
          };
        }) || [];
      const type = method['return-value']?.[0].type?.[0].$.name;
      const returnType = this.getType(type);
      if (returnType === type) {
        this.filterAndAddImport(imports, enums, returnType);
      }
      methods.push({
        name: method.$.name,
        returnType,
        params,
      });
    });
    return { methods, imports };
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
    const members =
      (enum_.member?.map((member) => ({
        name: member.$.name.toUpperCase(),
        value: member.$.name,
      })) as Member[]) || [];
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

  private checkEnum(enums: GirEnumElement[], type: string) {
    if (enums.find((enum_) => enum_.$.name === type)) {
      return true;
    }
    return false;
  }

  private filterAndAddImport(
    imports: Import[],
    enums: GirEnumElement[],
    type: string,
  ) {
    if (this.checkEnum(enums, type)) {
      this.addImport(imports, {
        import: type,
        from: `../enums/${type}`,
      });
    } else if (type.includes('.')) {
      const import_ = type.split('.')[0];
      const lib = this.getLibImport(import_);
      if (lib) {
        this.addImport(imports, {
          import: import_,
          from: lib,
        });
      }
    }
  }

  private addImport(imports: Import[], import_: Import) {
    if (imports.find((imp) => imp.import === import_.import)) return;
    imports.push(import_);
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

  private getLibImport(lib: string) {
    switch (lib) {
      case 'GLib':
        return '@girs/node-glib-2.0';
      case 'GObject':
        return '@girs/node-gobject-2.0';
      case 'Gdk':
        return '@girs/node-gdk-4.0';
      case 'Gio':
        return '@girs/node-gio-2.0';
      case 'Gtk':
        return '@girs/node-gtk-4.0';
      case 'Gsk':
        return '@girs/node-gsk-4.0';
      case 'Pango':
        return '@girs/node-pango-1.0';
      default:
        return;
    }
  }
}

export enum Kind {
  Elements = 'elements',
  Types = 'types',
}
