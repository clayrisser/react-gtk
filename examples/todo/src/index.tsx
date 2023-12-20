/**
 * File: /src/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 18-12-2023 04:58:18
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

import React, { useState } from 'react';
import { render, Box, FlexBox } from '@react-gtk/core';

export const Example = () => {
  // const [count, setCount] = useState(0);

  return (
    <Box
      style={{
        backgroundColor: 'green',
        padding: '10px',
      }}
    >
      <FlexBox
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          width: 600,
          // @ts-ignore
          padding: '10px',
          height: 600,
          backgroundColor: 'red',
        }}
      >
        <FlexBox
          style={{
            width: 100,
            // @ts-ignore
            padding: '10px',
            height: 100,
            backgroundColor: 'yellow',
          }}
        />
        <FlexBox
          style={{
            width: 100,
            // @ts-ignore
            padding: '10px',
            height: 100,
            backgroundColor: 'blue',
          }}
        />
      </FlexBox>
    </Box>
  );
};

(async () => {
  await render(<Example />);
})();
