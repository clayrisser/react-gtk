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

// import Gtk from '@girs/node-gtk-4.0';

declare namespace JSX {
  type Ref<T> = import('react').Ref<T>;
  type ReactNode = import('react').ReactNode;
  type Gtk = import('@girs/node-gtk-4.0');

  interface IntrinsicElements {
    Label: {
      Properties?: any;
      accessible_role?: Gtk.accessible_role;
      attributes?: any;
      can_focus?: boolean;
      can_target?: boolean;
      css_classes?: string[];
      css_name?: string;
      cursor?: string;
      ellipsize?: any;
      extra_menu?: any;
      focus_on_click?: boolean;
      focusable?: boolean;
      g_type_instance?: any;
      halign?: Gtk.Align;
      has_default?: boolean;
      has_focus?: boolean;
      has_tooltip?: boolean;
      height_request?: number;
      hexpand?: any;
      hexpand_set?: any;
      justify?: Gtk.Justification;
      label: string;
      layout_manager?: any;
      lines?: number;
      margin_bottom?: number;
      margin_end?: number;
      margin_start?: number;
      margin_top?: number;
      max_width_chars?: number;
      mnemonic_keyval?: number;
      mnemonic_widget?: any;
      name?: string;
      natural_wrap_mode?: any;
      opacity?: number;
      overflow?: Gtk.PolicyType;
      parent?: any;
      parent_instance?: any;
      receives_default?: boolean;
      root?: any;
      scale_factor?: number;
      selectable?: boolean;
      sensitive?: boolean;
      single_line_mode?: boolean;
      tooltip_markup?: string;
      tooltip_text?: string;
      use_markup?: boolean;
      use_underline?: boolean;
      valign?: Gtk.Align;
      vexpand?: any;
      vexpand_set?: any;
      visible?: boolean;
      width_chars?: number;
      width_request?: number;
      wrap?: boolean;
      wrap_mode?: any;
      xalign?: number;
      yalign?: number;
      $gtype?: any;
      name?: string;
      ref?: Ref<any>;
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
