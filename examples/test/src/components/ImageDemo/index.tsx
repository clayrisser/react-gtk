/**
 * File: /src/components/ImageDemo/index.tsx
 * Project: @react-gtk/test-example
 * File Created: 29-12-2023 12:23:23
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

// import React from 'react';
// import { Image, Box } from '@react-gtk/core';
// import Gtk from '@girs/node-gtk-4.0';

// function App() {
//   const imageProps = {
//     fromFile: '/docs/assets/box.png',
//   };
//   return (
//     <Box style={{ backgroundColor: 'yellow' }}>
//       <Image {...imageProps} iconSize={Gtk.IconSize.LARGE} />
//     </Box>
//   );
// }
// export default App;

import React from 'react';
import Gtk from '@girs/node-gtk-4.0';
import { Image, Box, Label } from '@react-gtk/core';

function App() {
  return (
    <Box spacing={10} style={{ backgroundColor: 'lightgray' }}>
      <Label label="Welcome to Image Component" />
      <Image
        fromFile="/docs/assets/box.png"
        canFocus={true}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        visible={true}
        tooltipText="This is an image"
        sizeRequest={[100, 200]}
        iconSize={Gtk.IconSize.LARGE}
      />
    </Box>
  );
}

export default App;
