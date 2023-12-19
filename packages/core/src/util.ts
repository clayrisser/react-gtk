/*
 *  File: /src/util.ts
 *  Project: @react-gtk/core
 *  File Created: 29-11-2023 00:15:56
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

import type { DimensionValue } from 'react-native';
import type { Element } from './elements/Element';

function isDev(): boolean {
  if (typeof process.env.NODE_ENV === 'undefined') {
    return typeof process.env.__DEV__ === 'undefined' ? false : process.env.__DEV__.toLowerCase() !== 'false';
  }
  return process.env.NODE_ENV.toLowerCase() !== 'prod' && process.env.NODE_ENV.toLowerCase() !== 'production';
}

export const dev = isDev();

export const logger = {
  ...console,
  debug: dev ? console.debug : (..._args: any[]) => undefined,
};

export function debugRef(debug = true) {
  if (!debug) return () => undefined;
  return (ref: Element) => logger.debug(JSON.stringify(ref.node, null, 2));
}

export function parseSize(dimension?: DimensionValue): number | 'auto' | `${number}%` | undefined {
  if (!dimension) return;
  if (typeof dimension === 'number') return dimension;
  if (dimension === 'auto') return dimension;
  if (typeof dimension === 'string' && /%$/.test(dimension)) return dimension;
  dimension = parseInt(dimension.toString(), 10);
  if (Number.isFinite(dimension)) return dimension;
  return;
}
