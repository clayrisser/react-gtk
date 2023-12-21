/*
 *  File: /src/yoga.ts
 *  Project: @react-gtk/core
 *  File Created: 19-12-2023 12:44:12
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

import Yoga, { Align, FlexDirection, Justify, Overflow, PositionType, Wrap } from 'yoga-layout/wasm-sync';
import type { FlexStyle, DimensionValue, FlexAlignType } from 'react-native';
import { YogaInstance } from './types';

export function lookupFlexDirection(flexDirection?: FlexStyle['flexDirection']) {
  switch (flexDirection) {
    case 'row':
      return Yoga.FLEX_DIRECTION_ROW;
    case 'row-reverse':
      return Yoga.FLEX_DIRECTION_ROW_REVERSE;
    case 'column':
      return Yoga.FLEX_DIRECTION_COLUMN;
    case 'column-reverse':
      return Yoga.FLEX_DIRECTION_COLUMN_REVERSE;
  }
  return;
}

export function lookupFlexWrap(flexWrap?: FlexStyle['flexWrap']) {
  switch (flexWrap) {
    case 'nowrap':
      return Yoga.WRAP_NO_WRAP;
    case 'wrap':
      return Yoga.WRAP_WRAP;
    case 'wrap-reverse':
      return Yoga.WRAP_WRAP_REVERSE;
  }
  return;
}

export function lookupJustify(justifyContent?: FlexStyle['justifyContent']) {
  switch (justifyContent) {
    case 'flex-start':
      return Yoga.JUSTIFY_FLEX_START;
    case 'center':
      return Yoga.JUSTIFY_CENTER;
    case 'flex-end':
      return Yoga.JUSTIFY_FLEX_END;
    case 'space-between':
      return Yoga.JUSTIFY_SPACE_BETWEEN;
    case 'space-around':
      return Yoga.JUSTIFY_SPACE_AROUND;
    case 'space-evenly':
      return Yoga.JUSTIFY_SPACE_EVENLY;
  }
  return;
}

export function lookupAlign(align?: FlexAlignType | 'auto', auto?: true): Align | undefined;
export function lookupAlign(
  align: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | undefined,
  auto: false,
): Align | undefined;
export function lookupAlign(
  align?: FlexAlignType | 'space-between' | 'space-around' | 'auto',
  auto = true,
): Align | undefined {
  switch (align) {
    case 'flex-start':
      return Yoga.ALIGN_FLEX_START;
    case 'center':
      return Yoga.ALIGN_CENTER;
    case 'flex-end':
      return Yoga.ALIGN_FLEX_END;
    case 'stretch':
      return Yoga.ALIGN_STRETCH;
    case 'baseline':
      return Yoga.ALIGN_BASELINE;
    case 'space-between':
      return Yoga.ALIGN_SPACE_BETWEEN;
    case 'space-around':
      return Yoga.ALIGN_SPACE_AROUND;
    case 'auto':
      return auto ? Yoga.ALIGN_AUTO : undefined;
  }
  return;
}

export function lookupPosition(position?: FlexStyle['position']) {
  switch (position) {
    case 'absolute':
      return Yoga.POSITION_TYPE_ABSOLUTE;
    case 'relative':
      return Yoga.POSITION_TYPE_RELATIVE;
  }
  return;
}

export function lookupOverflow(overflow?: FlexStyle['overflow']) {
  switch (overflow) {
    case 'visible':
      return Yoga.OVERFLOW_VISIBLE;
    case 'hidden':
      return Yoga.OVERFLOW_HIDDEN;
    case 'scroll':
      return Yoga.OVERFLOW_SCROLL;
  }
  return;
}

export function parseDimension(
  dimension: DimensionValue | undefined,
  auto: false,
  percentage: false,
): number | undefined;
export function parseDimension(dimension: DimensionValue | undefined, auto: false): number | `${number}%` | undefined;
export function parseDimension(dimension?: DimensionValue, auto?: true): number | 'auto' | `${number}%` | undefined;
export function parseDimension(
  dimension?: DimensionValue,
  auto = true,
  percentage = true,
): number | 'auto' | `${number}%` | undefined {
  if (!dimension) return;
  if (typeof dimension === 'number') return dimension;
  if (auto && dimension === 'auto') return dimension;
  if (percentage && typeof dimension === 'string' && /%$/.test(dimension)) return dimension;
  dimension = parseInt(dimension.toString(), 10);
  if (Number.isFinite(dimension)) return dimension;
  return;
}

export interface YogaStyle {
  alignContent?: Align;
  alignItems?: Align;
  alignSelf?: Align;
  flex?: number;
  flexBasis?: number;
  flexDirection?: FlexDirection;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: Wrap;
  height?: number | 'auto' | `${number}%`;
  justifyContent?: Justify;
  maxHeight?: number | `${number}%`;
  maxWidth?: number | `${number}%`;
  minHeight?: number | `${number}%`;
  minWidth?: number | `${number}%`;
  overflow?: Overflow;
  position?: PositionType;
  width?: number | 'auto' | `${number}%`;
}
