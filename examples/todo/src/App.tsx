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
import { Box, FlowBox, DropDown, ScrolledWindow, Scrollbar } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { EmptyTaskScreen } from './screens/EmptyTaskScreen';
import useTodoStore from './state/useTodoStore';
import { TodoItem } from './components/TodoItem';

const App = () => {
  const todos = useTodoStore((state: any) => state.todos);
  const [toggleAddTasks, setToggleAddTasks] = useState(false);

  return (
    <ScrolledWindow vexpand>
      <Box orientation={Gtk.Orientation.VERTICAL}>
        <Box visible={toggleAddTasks || todos.length > 0 ? false : true} vexpand halign={Gtk.Align.CENTER}>
          <EmptyTaskScreen setToggleAddTasks={setToggleAddTasks} toggleAddTasks={toggleAddTasks} />
        </Box>

        <Box
          orientation={Gtk.Orientation.VERTICAL}
          visible={todos.length > 0 ? true : false}
          halign={Gtk.Align.CENTER}
          style={{ padding: '6px' }}
        >
          {todos.map((todo: any) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </Box>
        <Box visible={toggleAddTasks ? true : false} halign={Gtk.Align.CENTER} style={{ padding: '10px' }}>
          <InputSection />
        </Box>
      </Box>
    </ScrolledWindow>
  );
};

export default App;
