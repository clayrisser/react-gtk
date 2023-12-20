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

// import Yoga from 'yoga-layout/wasm-sync';

// const root = Yoga.Node.create();
// root.setWidth(500);
// root.setHeight(300);
// // root.setJustifyContent(Yoga.JUSTIFY_CENTER);
// // root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);

// // const node1 = Yoga.Node.create();
// // node1.setWidth(100);
// // node1.setHeight(100);

// // const node2 = Yoga.Node.create();
// // node2.setWidth(100);
// // node2.setHeight(100);

// // root.insertChild(node1, 0);
// // root.insertChild(node2, 1);

// root.calculateLayout(500, 300, Yoga.DIRECTION_LTR);
// console.log(root.getComputedLayout());
// // {left: 0, top: 0, width: 500, height: 300}
// // console.log(node1.getComputedLayout());
// // {left: 150, top: 0, width: 100, height: 100}
// // console.log(node2.getComputedLayout());
// // {left: 250, top: 0, width: 100, height: 100}

import React, { useState } from 'react';
import { render, Box, FlexBox } from '@react-gtk/core';

export const Example = () => {
  // const [count, setCount] = useState(0);

  return (
    <Box
      style={{
        backgroundColor: 'green',
        // @ts-ignore
        padding: '10px',
      }}
    >
      <FlexBox
        style={{
          width: 400,
          // @ts-ignore
          padding: '10px',
          height: 400,
          backgroundColor: 'red',
        }}
      >
        <FlexBox
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'blue',
          }}
        />
        <FlexBox
          style={{
            width: 400,
            height: 400,
            backgroundColor: 'yellow',
          }}
        >
          <Box style={{ backgroundColor: 'purple' }} />
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

(async () => {
  await render(<Example />);
})();
