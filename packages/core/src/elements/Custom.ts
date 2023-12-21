/*
 *  File: /src/elements/Custom.ts
 *  Project: @react-gtk/core
 *  File Created: 21-12-2023 11:05:43
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

import { Element } from './Element';
import { Ref } from 'react';
import { StyleProps } from '../style';
import { PublicInstance } from '../types';
import { CustomWidget } from '../widgets/Custom';

export interface CustomProps extends StyleProps {
  ref?: Ref<PublicInstance<CustomWidget>>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Custom: CustomProps;
    }
  }
}

export class Custom extends Element<CustomWidget, CustomProps> {
  constructor(props?: CustomProps) {
    super(new CustomWidget(), props);
  }
}
