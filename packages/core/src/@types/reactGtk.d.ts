/*
 *  File: /src/@types/reactGtk.d.ts
 *  Project: @react-gtk/core
 *  File Created: 05-12-2023 09:55:01
 *  Author: HariKrishna
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

// declare namespace JSX {
//   type Ref<T> = import('react').Ref<T>;
//   type ReactNode = import('react').ReactNode;
//   type Gtk = import('@girs/node-gtk-4.0');

//   interface IntrinsicElements {
//     Label?: {
//       Properties?: any;
//       accessible_role?: Gtk.AccessibleRole;
//       attributes?: any;
//       can_focus?: boolean;
//       can_target?: boolean;
//       css_classes?: string[];
//       css_name?: string;
//       cursor?: string;
//       ellipsize?: any;
//       extra_menu?: any;
//       focus_on_click?: boolean;
//       focusable?: boolean;
//       g_type_instance?: any;
//       halign?: Gtk.Align;
//       has_default?: boolean;
//       has_focus?: boolean;
//       has_tooltip?: boolean;
//       height_request?: number;
//       hexpand?: any;
//       hexpand_set?: any;
//       justify?: Gtk.Justification;
//       label?: string;
//       layout_manager?: any;
//       lines?: number;
//       margin_bottom?: number;
//       margin_end?: number;
//       margin_start?: number;
//       margin_top?: number;
//       max_width_chars?: number;
//       mnemonic_keyval?: number;
//       mnemonic_widget?: any;
//       name?: string;
//       natural_wrap_mode?: any;
//       opacity?: number;
//       overflow?: Gtk.PolicyType;
//       parent?: any;
//       parent_instance?: any;
//       receives_default?: boolean;
//       root?: any;
//       scale_factor?: number;
//       selectable?: boolean;
//       sensitive?: boolean;
//       single_line_mode?: boolean;
//       tooltip_markup?: string;
//       tooltip_text?: string;
//       use_markup?: boolean;
//       use_underline?: boolean;
//       valign?: Gtk.Align;
//       vexpand?: any;
//       vexpand_set?: any;
//       visible?: boolean;
//       width_chars?: number;
//       width_request?: number;
//       wrap?: boolean;
//       wrap_mode?: any;
//       xalign?: number;
//       yalign?: number;
//       $gtype?: any;
//       name?: string;
//       ref?: Ref<any>;
//     };
//     Window?: {
//       ref?: Ref<any>;
//     };
//     Box?: {
//       ref?: Ref<any>;
//       children: ReactNode;
//       accessibleRole?: AccessibleRole;
//       baselinePosition?: Gtk.BaselinePosition;
//       canFocus?: boolean;
//       canTarget?: boolean;
//       cssClasses?: string[];
//       cssName?: string;
//       cursor?: Gdk.Cursor;
//       focusOnClick?: boolean;
//       focusable?: boolean;
//       gTypeInstance?: TypeInstance;
//       halign?: Gtk.Align;
//       hasDefault?: boolean;
//       hasFocus?: boolean;
//       hasTooltip?: boolean;
//       heightRequest?: number;
//       hexpand?: boolean;
//       hexpandSet?: boolean;
//       homogeneous?: boolean;
//       layoutManager?: Gtk.LayoutManager;
//       marginBottom?: number;
//       marginEnd?: number;
//       marginStart?: number;
//       marginTop?: number;
//       name?: string;
//       opacity?: number;
//       orientation?: Gtk.Orientation;
//       overflow?: Overflow;
//       parent?: Gtk.Widget;
//       parentInstance?: Gtk.widget;
//       receivesDefault?: boolean;
//       root?: Gtk.Root;
//       scaleFactor?: number;
//       sensitive?: boolean;
//       spacing?: number;
//       tooltipMarkup?: string;
//       tooltipText?: string;
//       valign?: Gtk.Align;
//       vexpand?: boolean;
//       vexpandSet?: boolean;
//       visible?: boolean;
//       widthRequest?: number;
//       $gtype?: GType<Gtk.Box>;
//       name?: string;
//     };
//     Button?: {
//       ref?: Ref<any>;
//       label?: string;
//       onClicked?: () => void;
//       accessibleRole?: AccessibleRole;
//       actionName?: string;
//       actionTarget?: GLib.Variant;
//       canFocus?: boolean;
//       canTarget?: boolean;
//       child?: Gtk.Widget;
//       cssClasses?: string[];
//       cssName?: string;
//     };
//     Image?: {
//       Properties?: any;
//       accessibleRole?: AccessibleRole;
//       canFocus?: boolean;
//       cssName?: string;
//       cursor?: Gdk.Cursor;
//       file?: string;
//       focusOnClick?: boolean;
//       focusable?: boolean;
//       gTypeInstance?: TypeInstance;
//       gicon?: Gio.Icon;
//       halign?: Gtk.Align;
//       hasDefault?: boolean;
//       hasFocus?: boolean;
//       hasTooltip?: boolean;
//       heightRequest?: number;
//       hexpand?: boolean;
//       hexpandSet?: boolean;
//       iconName?: string;
//       iconSize?: Gtk.IconSize;
//       layoutManager?: Gtk.LayoutManager;
//       marginBottom?: number;
//       marginEnd?: number;
//       marginStart?: number;
//       marginTop?: number;
//       name?: string;
//       opacity?: number;
//       overflow?: Overflow;
//       paintable?: Paintable;
//       parent?: Gtk.Widget;
//       parentInstance?: InitiallyUnowned;
//       pixelSize?: number;
//       receivesDefault?: boolean;
//       resource?: string;
//       root?: Gtk.Root;
//       scaleFactor?: number;
//       sensitive?: boolean;
//       storageType?: Gtk.ImageType;
//       tooltipMarkup?: string;
//       tooltipText?: string;
//       useFallback?: boolean;
//       valign?: Gtk.Align;
//       vexpand?: boolean;
//       vexpandSet?: boolean;
//       visible?: boolean;
//       widthRequest?: number;
//       $gtype?: GType<Gtk.Image>;
//       name?: string;
//       ref?: Ref<any>;
//       resource?: string;
//     };
//     Grid?: {
//       ref?: Ref<any>;
//       children?: ReactNode;
//       accessibleRole?: AccessibleRole;
//       baselineRow?: number;
//       canFocus?: boolean;
//       canTarget?: boolean;
//       columnHomogeneous?: boolean;
//       columnSpacing?: number;
//       cssClasses?: string[];
//       cssName?: string;
//       cursor?: Gdk.Cursor;
//       focusOnClick?: boolean;
//       focusable?: boolean;
//       gTypeInstance?: TypeInstance;
//       halign?: Gtk.Align;
//       hasDefault?: boolean;
//       hasFocus?: boolean;
//       hasTooltip?: boolean;
//       heightRequest?: number;
//       hexpand?: boolean;
//       hexpandSet?: boolean;
//       layoutManager?: Gtk.LayoutManager;
//       marginBottom?: number;
//       marginEnd?: number;
//       marginStart?: number;
//       marginTop?: number;
//       name?: string;
//       opacity?: number;
//       orientation?: Gtk.Orientation;
//       overflow?: Overflow;
//       parent?: Gtk.Widget;
//       parentInstance?: InitiallyUnowned;
//       receivesDefault?: boolean;
//       root?: Gtk.Root;
//       rowHomogeneous?: boolean;
//       rowSpacing?: number;
//       scaleFactor?: number;
//       sensitive?: boolean;
//       tooltipMarkup?: string;
//       tooltipText?: string;
//       valign?: Gtk.Align;
//       vexpand?: boolean;
//       vexpandSet?: boolean;
//       visible?: boolean;
//       widthRequest?: number;
//       $gtype?: GType<Gtk.Grid>;
//       name?: string;
//     };
//     Text?: {
//       ref?: Ref<any>;
//       children: ReactNode;
//       accessibleRole?: AccessibleRole;
//       activatesDefault?: boolean;
//       attributes?: any;
//       buffer?: Gtk.TextBuffer;
//       canFocus?: boolean;
//       canTarget?: boolean;
//       cssClasses?: string[];
//       cssName?: string;
//       cursor?: Gdk.Cursor;
//       cursorPosition?: number;
//       editable?: boolean;
//       enableEmojiCompletion?: boolean;
//       enableUndo?: boolean;
//       extraMenu?: Gtk.MenuModel;
//       focusOnClick?: boolean;
//       focusable?: boolean;
//       gTypeInstance?: TypeInstance;
//       halign?: Gtk.Align;
//       hasDefault?: boolean;
//       hasFocus?: boolean;
//       hasTooltip?: boolean;
//       heightRequest?: number;
//       hExpand?: boolean;
//       hExpandSet?: boolean;
//       imModule?: string;
//       inputHints?: Gtk.InputHints;
//       inputPurpose?: Gtk.InputPurpose;
//       invisibleChar?: number;
//       invisibleCharSet?: boolean;
//       layoutManager?: Gtk.LayoutManager;
//       marginBottom?: number;
//       marginEnd?: number;
//       marginStart?: number;
//       marginTop?: number;
//       maxLenght?: number;
//       maxWidthChars?: number;
//       name: string;
//       opacity?: number;
//       overflow?: Overflow;
//       overwriteMode?: boolean;
//       parent?: Gtk.Widget;
//       parentInstance?: InitiallyUnowned;
//       placeholderText?: string;
//       propagateTextWidth?: boolean;
//       receivesDefault?: boolean;
//       root?: Gtk.Root;
//       scaleFactor?: number;
//       scrollOffset?: number;
//       selectionBound?: number;
//       sensitive?: boolean;
//       tabs?: Gtk.TabArray;
//       text?: string;
//       tooltipMarkup?: string;
//       tooltipText?: string;
//       truncatrMultiline?: boolean;
//       valign?: Gtk.Align;
//       vexpand?: boolean;
//       vexpandSet?: boolean;
//       visibility?: boolean;
//       visible?: boolean;
//       widthChars?: number;
//       widthRequest?: number;
//       xAlign?: number;
//       $gtype?: GType<Gtk.Text>;
//       name?: string;
//     };
//   }
// }
