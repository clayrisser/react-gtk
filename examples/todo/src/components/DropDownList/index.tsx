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

import React, { useState, useEffect } from 'react';
import { Box, DropDown } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

const DropDownList = () => {
  const fruitList = new Gtk.StringList();
  fruitList.splice(0, 0, ['Apple', 'Banana', 'Pineapple', 'Carrot']);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelectionChange = (newSelection: any) => {
    const selectedItem = fruitList.getItem(newSelection)?.toString() ?? null;
    setSelectedItem(selectedItem);
  };

  useEffect(() => {
    if (selectedItem !== null) {
      console.log(`Selected item: ${selectedItem}`);
    }
  }, [selectedItem]);

  return (
    <Box>
      <DropDown
        model={fruitList}
        name="fruitDropDown"
        onDirectionChanged={handleSelectionChange}
        showArrow={true}
        selected={2}
        sensitive={true}
      />
    </Box>
  );
};

export default DropDownList;
