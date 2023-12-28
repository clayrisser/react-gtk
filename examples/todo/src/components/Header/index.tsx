/**
 * File: /src/components/Header/index.tsx
 * Project: @react-gtk/todo-example
 * File Created: 27-12-2023 17:18:52
 * Author: dharmendra
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
import { HeaderBar } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const titleWidget = new Gtk.Label();
  titleWidget.setLabel(props.title);

  return <HeaderBar titleWidget={titleWidget} />;
};
