/**
 * File: /src/components/StackSidebar/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 12-01-2024 12:22:15
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

import React, { useState } from 'react';
import { Box, Stack, Label } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export const StackSidebar = () => {
  const [selectedPage, setSelectedPage] = useState('page1');

  const handlePageSwitch = (pageName: any) => {
    setSelectedPage(pageName);
  };

  return (
    <Box orientation={Gtk.Orientation.HORIZONTAL}>
      <Stack visibleChildName={selectedPage}>
        <Label name="page1" label="Page 1 Content" />
        <Label name="page2" label="Page 2 Content" />
        <Label name="page3" label="Page 3 Content" />
      </Stack>
    </Box>
  );
};
