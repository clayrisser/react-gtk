/**
 * File: /src/components/SwitchDemo/index.tsx
 * Project: @react-gtk/test-example
 * File Created: 02-01-2024 11:22:59
 * Author: Clay Risser
 * -----
 * BitSpur (c) Copyright 2017 - 2024
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
import { Box, Switch } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export const SwitchDemo = () => {
  const handleActivate = () => {
    console.log('Switch activated');
  };

  return (
    <Box>
      <Box
        // @ts-ignore
        orientation={Gtk.Orientation.VERTICAL}
        style={{ backgroundColor: 'lightblue' }}
      >
        <Switch active={true} onActivate={handleActivate} />
        <Switch active={false} onActivate={handleActivate} />
        <Switch active={true} onActivate={handleActivate} />
      </Box>
    </Box>
  );
};
