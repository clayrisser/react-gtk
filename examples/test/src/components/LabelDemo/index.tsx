/**
 * File: /src/components/LabelDemo/index.tsx
 * Project: @react-gtk/test-example
 * File Created: 29-12-2023 12:22:35
 * Author: K S R PHANI BHUSHAN
 * -----
 * BitSpur (c) Copyright 2017 - 2023
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

import React from 'react';
import { Label, Box } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export const LabelDemo = () => {
  return (
    <Box
      // @ts-ignore
      orientation={Gtk.Orientation.VERTICAL}
    >
      <Label label="Hello World" style={{ fontSize: '24px', fontWeight: '700' }} />
      <Label label="Hello World" style={{ fontSize: '34px', fontWeight: '700' }} />
      <Label label="Hello World" style={{ fontSize: '44px', fontWeight: '700' }} />
    </Box>
  );
};
