/**
 * File: /src/components/TodoItem/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 28-12-2023 16:36:07
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
import Gtk from '@girs/node-gtk-4.0';
import { Box, CheckButton, Label, FlexBox, FlowBox } from '@react-gtk/core';
import { TodoProps } from '../../utils/todoProps';
import useTodoStore from '../../state/useTodoStore';

export const TodoItem = (props: TodoProps) => {
  const { id, title, completed, favorite, description } = props;
  const [toggleFavorite, toggleCompleted] = useTodoStore((state: any) => [state.toggleFavorite, state.toggleCompleted]);

  function handleFavorite() {
    toggleFavorite(id);
  }
  function handleCompleted() {
    toggleCompleted(id);
  }

  return (
    <Box orientation={Gtk.Orientation.VERTICAL} style={{ padding: '5px', minWidth: 300, backgroundColor: 'red' }}>
      <FlowBox>
        <CheckButton active={completed} onToggled={handleCompleted} />
        <Label label={title} />
        <CheckButton active={favorite} onToggled={handleFavorite} />
      </FlowBox>
    </Box>
  );
};
