/*
 *  File: /src/types.ts
 *  Project: @react-gtk/generate
 *  File Created: 06-12-2023 12:27:11
 *  Author: dharmendra
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

export interface GirClassProps {
  $: {
    name: string;
    parent: string;
    'c:symbol-prefix': string;
    'c:type': string;
    'glib:type-name': string;
    'glib:get-type': string;
  };
  method: Array<{
    $: {
      name: string;
      'c:identifier': string;
    };
    'return-value': Array<{
      $: {
        'transfer-ownership': string;
      };
      type: Array<{
        $: {
          name: string;
          'c:type': string;
        };
      }>;
    }>;
  }>;
  property: Array<{
    $: {
      name: string;
      writable: string;
      readable: string;
      'transfer-ownership': string;
    };
    type: Array<{
      $: {
        name: string;
        'c:type': string;
      };
    }>;
  }>;
  signal: Array<{
    $: {
      name: string;
      when: string;
    };
    'return-value': Array<{
      $: {
        'transfer-ownership': string;
      };
      type: Array<{
        $: {
          name: string;
        };
      }>;
    }>;
  }>;
}
