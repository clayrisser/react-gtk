import { describe, expect, it } from 'vitest';
import { TypeDefinition, lookupType } from '../src/typeUtil';

describe('lookupType', () => {
  it('maps gir primitives to typescript types', () => {
    expect(lookupType('gboolean')).toBe('boolean');
    expect(lookupType('gint')).toBe('number');
    expect(lookupType('gdouble')).toBe('number');
    expect(lookupType('utf8')).toBe('string');
    expect(lookupType('filename')).toBe('string');
    expect(lookupType('none')).toBe('void');
    expect(lookupType('gpointer')).toBe('any');
  });

  it('passes unknown types through', () => {
    expect(lookupType('Widget')).toBe('Widget');
    expect(lookupType(undefined)).toBe('unknown');
  });
});

describe('TypeDefinition', () => {
  it('resolves bare capitalized types to the Gtk namespace', () => {
    const type = new TypeDefinition('Widget');
    expect(type.type).toBe('Gtk.Widget');
    expect(type.importDefault).toBe('Gtk');
    expect(type.importFrom).toBe('@girs/node-gtk-4.0');
  });

  it('resolves dotted types through the import map', () => {
    const type = new TypeDefinition('Pango.FontDescription');
    expect(type.type).toBe('Pango.FontDescription');
    expect(type.importDefault).toBe('Pango');
    expect(type.importFrom).toBe('@girs/node-pango-1.0');
  });

  it('resolves GLib.DateTime used by Gtk.Calendar', () => {
    const type = new TypeDefinition('GLib.DateTime');
    expect(type.importDefault).toBe('GLib');
    expect(type.importFrom).toBe('@girs/node-glib-2.0');
  });

  it('leaves primitives without imports', () => {
    const type = new TypeDefinition('number');
    expect(type.importFrom).toBeUndefined();
    expect(type.toString()).toBe('number');
  });

  it('renders array types as tuples', () => {
    const type = new TypeDefinition('array', [new TypeDefinition('number'), new TypeDefinition('string')]);
    expect(type.toString()).toBe('[number, string]');
  });
});
