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
import { render } from '@react-gtk/core';
import App from './App';
import { Box, FlowBox, Button, Text } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';
import { Header } from './components/Header';

// export const App = () => {
//   return (
//     <FlowBox
//       style={{
//         backgroundColor: 'green',
//       }}
//     >
//       <Button
//         vexpand
//         hexpand
//         label="Click Me!"
//         onClicked={(_node) => {
//           console.log('Button was clicked!');
//         }}
//       />
//       <Text
//         onChanged={(node) => {
//           console.log(node.text);
//         }}
//       />
//     </FlowBox>
//   );
// };

(async () => {
  await render(
    <Box orientation={Gtk.Orientation.VERTICAL}>
      <Box style={{ width: 200 }}>
        <Header title="TODO" />
      </Box>
      <App />
    </Box>,
  );
})();
