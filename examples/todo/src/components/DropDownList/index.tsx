/**
 * File: /src/components/DropDownList/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 11-01-2024 11:42:13
 * Author: Clay Risser
 * -----
 * BitSpur (c) Copyright 2017 - 2024
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

// import React, { useState, useEffect } from 'react';
// import { Box, DropDown } from '@react-gtk/core';
// import Gtk from '@girs/node-gtk-4.0';

// export const DropDownList = () => {
//   const fruitList = new Gtk.StringList();
//   fruitList.splice(0, 0, ['Apple', 'Banana', 'Pineapple', 'Carrot']);

//   const [selectedItem, setSelectedItem] = useState<string | null>(null);

//   const handleSelectionChange = (newSelection: any) => {
//     const selectedItem = fruitList.getItem(newSelection)?.toString() ?? null;
//     setSelectedItem(selectedItem);
//   };

//   useEffect(() => {
//     if (selectedItem !== null) {
//       console.log(`Selected item: ${selectedItem}`);
//     }
//   }, [selectedItem]);

//   return (
//     <Box>
//       <DropDown
//         model={fruitList}
//         name="fruitDropDown"
//         onDirectionChanged={handleSelectionChange}
//         showArrow={true}
//         selected={2}
//         sensitive={true}
//       />
//     </Box>
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import { Box, DropDown } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

// Assuming DropDownProps is the correct type for your DropDown component.
// If not, adjust accordingly.
interface DropDownProps {
  model: Gtk.StringList;
  name: string;
  showArrow: boolean;
  selected: number;
  sensitive: boolean;
}

export const DropDownList = () => {
  const fruitList = new Gtk.StringList();
  fruitList.splice(0, 0, ['Apple', 'Banana', 'Pineapple', 'Carrot']);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // Use 'as' for type assertion if the library does not provide proper TypeScript types
  const dropDownRef = useRef<DropDownProps>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dropDownRef.current) {
        console.log('dropDownRef.current', dropDownRef.current);
        // Use type assertion if needed
        const selectedIndex = (dropDownRef.current as any).selected;
        if (selectedIndex !== Gtk.INVALID_LIST_POSITION) {
          const newSelectedItem = fruitList.getItem(selectedIndex)?.toString() ?? null;
          if (newSelectedItem !== selectedItem) {
            setSelectedItem(newSelectedItem);
          }
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selectedItem, fruitList]);

  useEffect(() => {
    if (selectedItem !== null) {
      console.log(`Selected item: ${selectedItem}`);
    }
  }, [selectedItem]);

  return (
    <Box>
      <DropDown
        ref={dropDownRef}
        model={fruitList}
        name="fruitDropDown"
        showArrow={true}
        selected={2}
        sensitive={true}
      />
    </Box>
  );
};
