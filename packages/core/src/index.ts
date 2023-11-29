/*
 *  File: /src/index.ts
 *  Project: @react-gtk/core
 *  File Created: 29-11-2023 00:26:45
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

import { LabelProps } from './elements/Label';
import { WindowProps } from './elements/Window';

export const Label = 'Label';
export const Window = 'Window';
export const Button = 'Button';

export type { LabelProps, WindowProps };

export * from './render';
