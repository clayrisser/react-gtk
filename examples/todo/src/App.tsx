/**
 * File: /src/App.tsx
 * Project: @react-gtk/todo-example
 * File Created: 27-12-2023 17:27:48
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
import { Box, FlowBox } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { EmptyTaskScreen } from './components/EmptyTaskScreen';
import useTasksStore from './state/useTasksStore';

const App = () => {
  const [tasks] = useTasksStore((state: any) => [state.tasks, state.setTasks]);
  const [toggleAddTasks, setToggleAddTasks] = useState(false);

  return (
    <Box orientation={Gtk.Orientation.VERTICAL}>
      <Header title="TODO" />
      <Box visible={toggleAddTasks || tasks.length > 0 ? false : true} vexpand halign={Gtk.Align.CENTER}>
        <EmptyTaskScreen setToggleAddTasks={setToggleAddTasks} toggleAddTasks={toggleAddTasks} />
      </Box>

      <FlowBox visible={toggleAddTasks ? true : false} halign={Gtk.Align.CENTER} style={{ padding: '10px' }}>
        <InputSection />
      </FlowBox>
    </Box>
  );
};

export default App;
