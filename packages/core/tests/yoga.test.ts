import Yoga from 'yoga-layout/sync';
import { describe, expect, it } from 'vitest';
import {
  lookupAlign,
  lookupFlexDirection,
  lookupFlexWrap,
  lookupJustify,
  lookupOverflow,
  lookupPosition,
  parseDimension,
} from '../src/yoga';

describe('lookup functions', () => {
  it('maps flex directions', () => {
    expect(lookupFlexDirection('row')).toBe(Yoga.FLEX_DIRECTION_ROW);
    expect(lookupFlexDirection('column-reverse')).toBe(Yoga.FLEX_DIRECTION_COLUMN_REVERSE);
    expect(lookupFlexDirection(undefined)).toBeUndefined();
  });

  it('maps flex wrap', () => {
    expect(lookupFlexWrap('wrap')).toBe(Yoga.WRAP_WRAP);
    expect(lookupFlexWrap(undefined)).toBeUndefined();
  });

  it('maps justify content', () => {
    expect(lookupJustify('space-between')).toBe(Yoga.JUSTIFY_SPACE_BETWEEN);
    expect(lookupJustify(undefined)).toBeUndefined();
  });

  it('maps align values and honours the auto flag', () => {
    expect(lookupAlign('stretch')).toBe(Yoga.ALIGN_STRETCH);
    expect(lookupAlign('auto')).toBe(Yoga.ALIGN_AUTO);
    expect(lookupAlign('auto' as never, false)).toBeUndefined();
  });

  it('maps position and overflow', () => {
    expect(lookupPosition('absolute')).toBe(Yoga.POSITION_TYPE_ABSOLUTE);
    expect(lookupOverflow('scroll')).toBe(Yoga.OVERFLOW_SCROLL);
  });
});

describe('parseDimension', () => {
  it('passes numbers through', () => {
    expect(parseDimension(42)).toBe(42);
  });

  it('supports auto and percentages by default', () => {
    expect(parseDimension('auto')).toBe('auto');
    expect(parseDimension('50%')).toBe('50%');
  });

  it('parses numeric strings', () => {
    expect(parseDimension('12px' as never)).toBe(12);
  });

  it('rejects auto and percentages when disabled', () => {
    expect(parseDimension('auto', false)).toBeUndefined();
    expect(parseDimension('50%', false, false)).toBe(50);
  });

  it('returns undefined for empty values', () => {
    expect(parseDimension(undefined)).toBeUndefined();
  });
});
