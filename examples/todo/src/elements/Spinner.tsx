/**
 * File: /src/elements/Spinner.tsx
 * Project: @react-gtk/todo-example
 * File Created: 12-01-2024 15:53:05
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
import { render, Spinner } from '@react-gtk/core';

export const SpinnerElement = () => {
  return <Spinner spinning={true} />;
};

(async () => {
  await render(<SpinnerElement />);
})();
