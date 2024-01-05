/*
 *  File: /src/typeUtil.ts
 *  Project: @react-gtk/generate
 *  File Created: 22-12-2023 07:39:32
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

export function lookupType(type: string | undefined) {
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
    case 'gint64':
      return 'number';
    case 'guint64':
      return 'number';
    case 'gint16':
      return 'number';
    case 'guint16':
      return 'number';
    case 'guint8':
      return 'number';
    case 'gint8':
      return 'number';
    case 'guint32':
      return 'number';
    case 'gint32':
      return 'number';
    case 'gunichar':
      return 'string';
    case 'char':
      return 'string';
    case 'int':
      return 'number';
    case 'short':
      return 'number';
    case 'long':
      return 'number';
    case 'float':
      return 'number';
    case 'double':
      return 'number';
    case 'unsigned char':
      return 'number';
    case 'unsigned int':
      return 'number';
    case 'unsigned short':
      return 'number';
    case 'unsigned long':
      return 'number';
    case 'filename':
      return 'string';
  }
  return type;
}

export const importTypeMap: Record<string, ImportTypeInfo> = {
  Pango: {
    from: '@girs/node-pango-1.0',
    types: ['FontMap', 'TabArray', 'WrapMode', 'AttrList', 'EllipsizeMode'],
  },
  Gdk: {
    from: '@girs/node-gdk-4.0',
    types: ['Cursor', 'Paintable', 'Display', 'Rectangle', 'GLContext', 'RGBA'],
  },
  GdkPixbuf: {
    from: '@girs/node-gdkpixbuf-2.0',
    types: ['Pixbuf'],
  },
  Gsk: {
    from: '@girs/node-gsk-4.0',
    types: ['Transform'],
  },
  Gio: {
    from: '@girs/node-gio-2.0',
    types: ['File', 'MenuModel', 'ListModel', 'Icon', 'Permission', 'AppInfo'],
  },
  cairo: {
    from: '@girs/node-cairo-1.0',
    types: ['FontOptions'],
  },
  GLib: {
    from: '@girs/node-glib-2.0',
    types: ['DestroyNotify', 'Error', 'Variant'],
  },
};

export class TypeDefinition {
  public importAs?: string;
  public importDefault?: string;
  public importFrom?: string;

  constructor(
    public type: string,
    public items?: TypeDefinition[],
  ) {
    const importType = this.lookupImportType(type);
    if (importType) {
      this.importDefault = importType.importDefault;
      this.importFrom = importType.importFrom;
      this.type = importType.importType;
    }
  }

  lookupImportType(type: string) {
    const importType = Object.entries(importTypeMap).reduce<
      ImportType | undefined
    >(
      (
        importType: ImportType | undefined,
        [importDefault, importTypeInfo]: [string, ImportTypeInfo],
      ) => {
        if (importType) return importType;
        if (type.indexOf('.') !== -1) {
          const [importDefault, typeValue] = type.split('.');
          if (importTypeInfo.types.includes(typeValue)) {
            return {
              importDefault,
              importFrom: importTypeInfo.from,
              importType: `${importDefault}.${typeValue}`,
            };
          }
          return undefined;
        }
        if (importTypeInfo.types.includes(type)) {
          return {
            importDefault,
            importFrom: importTypeInfo.from,
            importType: `${importDefault}.${type}`,
          };
        }
        return undefined;
      },
      undefined,
    );
    if (importType) return importType;
    if (type[0].toUpperCase() === type[0] && type.indexOf('.') === -1) {
      return {
        importDefault: 'Gtk',
        importFrom: '@girs/node-gtk-4.0',
        importType: `Gtk.${type}`,
      };
    }
    return undefined;
  }

  toString(): string {
    if (this.type === 'array')
      return `[${(this.items || [])
        .map((t: TypeDefinition) => t.toString())
        .join(', ')}]`;
    return this.type;
  }
}

export interface ImportTypeInfo {
  from: string;
  types: string[];
}

export interface ImportType {
  importDefault: string;
  importFrom: string;
  importType: string;
}
