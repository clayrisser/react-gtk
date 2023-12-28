/**
 * File: /src/oldApp.tsx
 * Project: @react-gtk/todo-example
 * File Created: 27-12-2023 14:58:43
 * Author: dharmendra
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
import { Box, FlowBox, FlowBoxChild, Label, Button, Text } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

const _App = () => {
  return (
    <Box
      baselinePosition={Gtk.BaselinePosition.CENTER}
      style={{ backgroundColor: 'green', border: 'solid', borderWidth: '3px' }}
    >
      <FlowBox style={{ width: 'auto', height: 'auto' }} valign={Gtk.Align.START}>
        <FlowBox valign={Gtk.Align.START}>
          <FlowBoxChild style={{ height: 50, width: 350, backgroundColor: 'red' }}>
            <Label style={{ fontSize: '24px' }} label="TODO" />
          </FlowBoxChild>
        </FlowBox>
        <FlowBox>
          <FlowBoxChild style={{ padding: '30px', backgroundColor: 'blue' }}>
            <Text placeholderText="Add Todo..." style={{ fontSize: '18px' }} />
          </FlowBoxChild>
          <FlowBoxChild>
            <Button label="Add" />
          </FlowBoxChild>
        </FlowBox>
      </FlowBox>
    </Box>
  );
};

export default undefined;
