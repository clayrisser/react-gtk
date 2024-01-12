/**
 * File: /src/elements/WindowHandle.tsx
 * Project: @react-gtk/todo-example
 * File Created: 12-01-2024 16:52:22
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
import { render, Button, WindowHandle } from '@react-gtk/core';

export const WindowHandleElement = () => {
  return (
    <WindowHandle>
      <Button label="Click Me" onClicked={() => console.log('Button clicked')} />
    </WindowHandle>
  );
};

(async () => {
  await render(<WindowHandleElement />);
})();
