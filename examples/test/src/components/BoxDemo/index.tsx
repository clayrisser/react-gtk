/**
 * File: /src/components/BoxDemo/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 29-12-2023 10:20:23
 * Author: Pavan Kumar
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
import { Box } from '@react-gtk/core';

export function BoxDemo() {
  return (
    <Box
      style={{
        width: 400,
        height: 400,
        backgroundColor: 'red',
      }}
    >
      <Box
        style={{
          width: 200,
          height: 100,
          backgroundColor: 'green',
        }}
      />
      <Box
        style={{
          width: 200,
          height: 50,
          backgroundColor: 'blue',
        }}
      />
      <Box
        style={{
          width: 200,
          height: 50,
          backgroundColor: 'yellow',
        }}
      />
    </Box>
  );
}
