/**
 * File: /src/components/TextDemo/index.tsx
 * Project: @react-gtk/test-example
 * File Created: 29-12-2023 17:04:10
 * Author: HariKrishna
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
import { Box, Text } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export const TextDemo = () => {
  return (
    <Box>
      <Box
        // @ts-ignore
        orientation={Gtk.Orientation.VERTICAL}
        style={{ backgroundColor: 'green', width: 200 }}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        hexpand
      >
        {/* @ts-ignore */}
        <Text text="Hello World" style={{ fontSize: '24px', fontWeight: '700' }} />
        {/* @ts-ignore */}
        <Text text="Hello World" style={{ fontSize: '28px', fontWeight: '700' }} />
        {/* @ts-ignore */}
        <Text text="Hello World" style={{ fontSize: '32px', fontWeight: '700' }} />
      </Box>
    </Box>
  );
};
