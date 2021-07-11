/**
 * File: /src/generate/typeLookup.ts
 * Project: react-gtk
 * File Created: 10-07-2021 23:46:21
 * Author: Clay Risser <email@clayrisser.com>
 * -----
 * Last Modified: 10-07-2021 23:48:47
 * Modified By: Clay Risser <email@clayrisser.com>
 * -----
 * Silicon Hills LLC (c) Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HashMap } from '~/types';

export function lookupType(type?: string | null) {
  if (!type) return 'void';
  return lookupTable[type] || type;
}

export const lookupTable: HashMap<string> = {
  none: 'void'
};
