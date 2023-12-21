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
import { ApplicationWindowProps } from './elements/ApplicationWindow';
import { BoxProps } from './elements/Box';
import { ButtonProps } from './elements/Button';
import { FlexBoxProps } from './elements/FlexBox';
import { FlexEdgeProps } from './elements/FlexEdge';
import { FlexRootProps } from './elements/FlexRoot';
import { GridProps } from './elements/Grid';
import { ImageProps } from './elements/Image';
import { FixedProps } from './elements/Fixed';
import { LabelProps } from './elements/Label';

export const Box = 'Box';
export const Button = 'Button';
export const FlexBox = 'FlexBox';
export const Fixed = 'Fixed';
export const FlexEdge = 'FlexEdge';
export const FlexRoot = 'FlexRoot';
export const Grid = 'Grid';
export const Image = 'Image';
export const Label = 'Label';
export const Window = 'Window';
export const Yoga = 'Yoga';

export type {
  ApplicationWindowProps,
  BoxProps,
  ButtonProps,
  FlexBoxProps,
  FlexEdgeProps,
  FlexRootProps,
  GridProps,
  ImageProps,
  LabelProps,
  FixedProps,
};

export * from './render';
