/**
 * File: /src/elements/Calender.tsx
 * Project: @react-gtk/todo-example
 * File Created: 12-01-2024 17:16:00
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

import React from 'react';
import { render, Box, Calendar } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export const CalendarElement = () => {
  const handleDaySelected = (node: any) => {
    // Logic when a day is selected
    console.log('Day selected:', node);
  };

  return (
    <Box orientation={Gtk.Orientation.VERTICAL}>
      <Calendar showDayNames={true} showHeading={true} showWeekNumbers={false} onDaySelected={handleDaySelected} />
    </Box>
  );
};

(async () => {
  await render(<CalendarElement />);
})();
