/*
 *  File: /src/@types/reactGtk.d.ts
 *  Project: @react-gtk/core
 *  File Created: 29-11-2023 00:28:16
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

declare namespace JSX {
  type Ref<T> = import('react').Ref<T>;
  type ReactNode = import('react').ReactNode;

  interface IntrinsicElements {
    Label: {
      ref?: Ref<any>;
      label?: string;
    };
    Window: {
      ref?: Ref<any>;
    };
    Box: {
      ref?: Ref<any>;
      children?: ReactNode;
      style?: any;
    };
    Button: {
      ref?: Ref<any>;
      label?: string;
      style?: any;
      onClicked?: () => void;
    };
    Image: {
      ref?: Ref<any>;
      resourcePath?: string;
      style?: any;
    };
  }
}
