/**
 * File: /src/components/InputSection/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 28-12-2023 11:34:38
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
import { FlowBox, FlowBoxChild, Button, Text } from '@react-gtk/core';
import useTodoStore from '../../state/useTodoStore';

export const InputSection = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state: any) => state.addTodo);

  const handleAddTodo = () => {
    if (!title) return;
    addTodo({
      title,
      completed: false,
      favorite: false,
      description: '',
      id: Date.now(),
    });
    setTitle('');
  };

  return (
    <FlowBox
      halign={Gtk.Align.FILL}
      style={{ minWidth: 350, borderStyle: 'solid', borderColor: 'skyBlue', borderWidth: 2 }}
    >
      <FlowBoxChild>
        <Button style={{ borderStyle: 'none' }} onClicked={handleAddTodo} label="+" />
      </FlowBoxChild>
      <FlowBoxChild>
        <Text
          text={title}
          placeholderText="Add TODO..."
          onChanged={(node: Gtk.Editable) => setTitle(node.text as string)}
        />
      </FlowBoxChild>
    </FlowBox>
  );
};
