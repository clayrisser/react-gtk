/*
 *  File: /src/elements/index.ts
 *  Project: @react-gtk/core
 *  File Created: 28-11-2023 23:43:49
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

import { FlexBox } from './FlexBox';
import { FlexEdge } from './FlexEdge';
import { FlexRoot } from './FlexRoot';
import { Instance } from '../types';
import { elements as generatedElements } from '../generated/elements';

export const elements: Record<string, Instance> = {
  ...generatedElements,
  FlexBox,
  FlexEdge,
  FlexRoot,
} as Record<string, any>;

export * from '../generated/elements';
export * from './Element';
export * from './FlexBox';
export * from './FlexEdge';
