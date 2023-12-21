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

import React from 'react';
import { render, Box, Custom, FlexBox, FlexRoot } from '@react-gtk/core';

export const Example = () => {
  return (
    <Box
      style={{
        width: 400,
        height: 400,
        backgroundColor: 'green',
      }}
    >
      <Custom />
      <FlexRoot
        // @ts-ignore
        hexpand
        style={{
          // height: 600,
          // width: 600,
          backgroundColor: 'blue',
        }}
      />
      {/*
        <FlexBox
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
          }}
        >
          <FlexBox style={{ width: 60, height: 60, backgroundColor: 'yellow' }} />
          <FlexBox style={{ width: 60, height: 60, backgroundColor: 'purple' }} />
          <FlexBox style={{ width: 60, height: 60, backgroundColor: 'yellow' }} />
        </FlexBox>
      </FlexRoot> */}
    </Box>
  );
};

(async () => {
  await render(<Example />);
})();
