/**
 * File: /src/components/ButtonDemo/index.tsx
 * Project: @react-gtk/test-example
 * File Created: 29-12-2023 11:08:52
 * Author: HariKrishna
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
import { Box, Button } from '@react-gtk/core';

export function ButtonDemo() {
  return (
    <Box
      style={{
        backgroundColor: 'lightgray',
      }}
    >
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </Box>
  );
}
