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

import { Box } from './Box';
import { Button } from './Button';
import { Grid } from './Grid';
import { Image } from './Image';
import { Instance } from '../types';
import { Label } from './Label';
import { Text } from './Text';
import { Yoga } from './Yoga';
// import { elements as generatedElements } from '../generated/elements';

export const elements: Record<string, Instance> = {
  // ...generatedElements,
  Box,
  Button,
  Label,
  Yoga,
  Image,
  Grid,
  Text,
} as Record<string, any>;

export * from './ApplicationWindow';
export * from './Box';
export * from './Button';
export * from './Element';
export * from './Label';
export * from './Image';
export * from './Grid';
export * from './Text';
export * from './Yoga';
// export * from '../generated/elements';
