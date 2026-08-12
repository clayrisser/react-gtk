import { describe, expect, it } from 'vitest';
import { buildCssDeclaration, psuedoClasses, styleProperties } from '../src/style';

describe('buildCssDeclaration', () => {
  it('renders a string property', () => {
    expect(buildCssDeclaration({ color: 'red' }, 'color', 'red')).toBe('  color: red;');
  });

  it('appends the default unit to numeric values', () => {
    expect(buildCssDeclaration({ fontSize: 16 }, 'fontSize', 16)).toBe('  font-size: 16px;');
    expect(buildCssDeclaration({ marginTop: 4 }, 'marginTop', 4)).toBe('  margin-top: 4px;');
  });

  it('keeps explicit string units untouched', () => {
    expect(buildCssDeclaration({ fontSize: '2em' }, 'fontSize', '2em')).toBe('  font-size: 2em;');
  });

  it('renders null as unset', () => {
    expect(buildCssDeclaration({ color: null }, 'color', null)).toBe('  color: unset;');
  });

  it('clears the background image when only a background color is set', () => {
    expect(buildCssDeclaration({ backgroundColor: 'red' }, 'backgroundColor', 'red')).toBe(
      '  background-image: none;\n  background-color: red;',
    );
    expect(buildCssDeclaration({ backgroundColor: 'red', backgroundImage: 'none' }, 'backgroundColor', 'red')).toBe(
      '  background-color: red;',
    );
  });

  it('ignores pseudo class keys and unknown properties', () => {
    expect(buildCssDeclaration({}, '&:hover', 'red')).toBe('');
    expect(buildCssDeclaration({}, 'notACssProp', 'red')).toBe('');
  });
});

describe('styleProperties', () => {
  it('maps camelCase keys to kebab-case css names', () => {
    expect(styleProperties.backgroundColor.name).toBe('background-color');
    expect(styleProperties.gtkIconSize.name).toBe('-gtk-icon-size');
  });

  it('declares every supported pseudo class', () => {
    expect([...psuedoClasses].sort()).toEqual([
      '&:active',
      '&:backdrop',
      '&:checked',
      '&:disabled',
      '&:focus',
      '&:hover',
      '&:indeterminate',
    ]);
  });
});
