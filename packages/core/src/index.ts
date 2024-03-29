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

import './gtkPolyfill';
import { FlexBoxProps } from './elements/FlexBox';
import { FlexEdgeProps } from './elements/FlexEdge';
import { FlexRootProps } from './elements/FlexRoot';

export const FlexBox = 'FlexBox';
export const FlexEdge = 'FlexEdge';
export const FlexRoot = 'FlexRoot';

export type { FlexBoxProps, FlexEdgeProps, FlexRootProps };

export * from './generated';
export * from './render';
export * from './types';
