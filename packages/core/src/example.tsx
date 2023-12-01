/**
 * File: /src/example.tsx
 * Project: @react-gtk/core
 * File Created: 29-11-2023 05:45:29
 * Author: Clay Risser
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
import { render, Box, Button, Label } from './index';
import Gtk from '@girs/node-gtk-4.0';

(async () => {
  await render(
    <Box style={{ orientation: Gtk.Orientation.VERTICAL, marginTop: 100 }}>
      <Button
        label="Click me!"
        onClicked={() => {
          console.log('I was clicked!');
        }}
      />
      <Label
        label="Label with markup"
        halign={4}
        justify={Gtk.Justification.RIGHT}
        tooltip_markup="<i>Tooltip</i> with <b>markup</b>"
        marginStart={10}
        marginTop={20}
      />
    </Box>,
  );
})();