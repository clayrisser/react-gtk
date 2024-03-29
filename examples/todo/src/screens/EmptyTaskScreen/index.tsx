/**
 * File: /src/screens/EmptyTaskScreen/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 28-12-2023 12:01:49
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

import React, { useState } from 'react';
import Gtk from '@girs/node-gtk-4.0';
import { Button, FlowBox, FlowBoxChild, Label, StackSidebar, Box, Stack } from '@react-gtk/core';

export interface EmptyTaskScreenProps {
  setToggleAddTasks: (toggle: boolean) => void;
  toggleAddTasks: boolean;
}

export const EmptyTaskScreen = (props: EmptyTaskScreenProps) => {
  const { setToggleAddTasks, toggleAddTasks } = props;

  // State to manage the visibility of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Box orientation={Gtk.Orientation.HORIZONTAL}>
      {sidebarVisible && <StackSidebar>{/* Place your sidebar content here */}</StackSidebar>}

      <Button label={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'} onClicked={toggleSidebar} />

      <FlowBox valign={Gtk.Align.CENTER}>
        <FlowBoxChild style={{ padding: '40px', backgroundColor: 'transparent' }}>
          <Label style={{ fontSize: '24px' }} label="Tasks Will Appear Here" />
        </FlowBoxChild>
        <FlowBoxChild style={{ height: 80 }}>
          <Button
            style={{ backgroundColor: 'skyBlue', color: 'white', fontSize: '18px' }}
            onClicked={() => setToggleAddTasks(!toggleAddTasks)}
            label="Add Tasks..."
          />
        </FlowBoxChild>
      </FlowBox>
    </Box>
  );
};
