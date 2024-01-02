/**
 * File: /src/App.tsx
 * Project: @react-gtk/example
 * File Created: 02-01-2024 12:57:28
 * Author: dharmendra
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
import Gtk from '@girs/node-gtk-4.0';
import { Box, HeaderBar, FlowBox, FlowBoxChild, Label } from '@react-gtk/core';

const App = () => {
  const titleWidget = new Gtk.Label();
  titleWidget.setLabel('Example');
  return (
    /* @ts-ignore */
    <Box orientation={Gtk.Orientation.VERTICAL}>
      <HeaderBar hexpand titleWidget={titleWidget} />
      {/* @ts-ignore */}
      <FlowBox vexpand orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
        <FlowBoxChild style={{ padding: '40px', backgroundColor: 'transparent' }}>
          <Label style={{ fontFamily: 'Italic', fontSize: '24px' }} label="Hello World" />
        </FlowBoxChild>
      </FlowBox>
    </Box>
  );
};

export default App;
