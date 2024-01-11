/**
 * File: /src/elements/Button.tsx
 * Project: @react-gtk/todo-example
 * File Created: 11-01-2024 17:25:21
 * Author: dharmendra
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
import Gtk from '@girs/node-gtk-4.0';
import { Button, render } from '@react-gtk/core';

export const ButtonElement = () => {
  return <Button label="Button" />;
};

(async () => {
  await render(<ButtonElement />);
})();
