/**
 * File: /src/components/ListBoxDemo/index.tsx
 * Project: @react-gtk/test-example
 * File Created: 29-12-2023 18:08:51
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
import { ListBox, ListBoxRow, Label, Box } from '@react-gtk/core';

function App() {
  return (
    <Box style={{ backgroundColor: 'red' }}>
      <ListBox style={{ height: 450, width: 650 }} vexpand>
        <ListBoxRow>
          <Label label="Item 1" />
        </ListBoxRow>
        <ListBoxRow>
          <Label label="Item 2" />
        </ListBoxRow>
        <ListBoxRow>
          <Label label="Item 3" />
        </ListBoxRow>
        <ListBoxRow>
          <Label label="Item 4" />
        </ListBoxRow>
      </ListBox>
    </Box>
  );
}

export default App;
