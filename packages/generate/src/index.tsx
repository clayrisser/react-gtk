/**
 * File: /src/index.tsx
 * Project: @react-gtk/generate
 * File Created: 01-12-2023 06:11:55
 * Author: Clay Risser
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
import { render, Code } from 'react-ast';
import { parseStringPromise } from 'xml2js';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Logger, splitModuleName, cleanString } from '@ts-for-gir/lib';

import type {
  GenerateConfig,
  ParsedPackageData,
  PackageSectionParsed,
  PackageDataParsed,
  PackageData,
} from '@ts-for-gir/lib';

// parse the gir file

// get all namespaces
// --> get all classes (filter out only widget)

const code = render(<Code>var a = 0</Code>);
// write to a file

// ----> get all methods
// ----> get all properties

function parsePackages(
  packages: PackageDataParsed[],
  parentSection?: PackageSectionParsed,
) {
  for (const pkg of packages) {
    console.log(`Found package "${pkg.$.name}"`);
    if (pkg.$.ignore === 'true' || !pkg.$.gir) {
      console.warn(`Ignoring package "${pkg.$.name}"`);
      continue;
    }
    // const transPgk = this.transformPackageData(pkg, parentSection);
    // console.packages.push(transPgk);
  }
}

function parseSections(sections: PackageSectionParsed[]) {
  for (const section of sections) {
    console.log(`Found section`, section.$.name);
    if (section.package) {
      // this.parsePackages(section.package);
      console.log('section.package', section.package);
    }

    if (section.section) {
      // this.parseSections(section.section);
      console.log('section.section', section.section);
    }
  }
}

function parseNamespace(namespace: any[]) {
  console.log('==================namespace==================\n\n');
  for (const ns of namespace) {
    // console.log('ns', ns);
    getClasses(ns.class);
    // getRecords(ns.record);
    // getEnumration(ns.enumeration);
  }
}

function getClasses(classes: any[]) {
  console.log('==================classes==================\n\n');
  for (const c of classes) {
    console.log('class', c);
    if (c.method) getMethods(c.method);
  }
}

function getMethods(methods: any[]) {
  console.log('==================methods==================\n\n');
  console.log('methods', methods);
  for (const m of methods) {
    console.log('method', m);
    if (m.parameters) getParameters(m.parameters);
  }
}

function getParameters(parameters: any[]) {
  console.log('==================parameters==================\n\n');
  for (const p of parameters) {
    console.log('parameter', p);
  }
}

function getRecords(records: any[]) {
  console.log('==================records==================\n\n');
  for (const r of records) {
    console.log('record', r);
  }
}

function getEnumration(enums: any[]) {
  console.log('==================enums==================\n\n');
  for (const e of enums) {
    console.log('enum', e);
  }
}

async function start() {
  const filePath = resolve(__dirname, '/usr/share/gir-1.0/Gtk-4.0.gir');
  console.log(`Parsing ${filePath}...`);
  const fileContents = await readFile(filePath, 'utf8');
  // console.log('fileContents', fileContents);
  const result = (await parseStringPromise(fileContents)) as any;
  // console.log('result', result.repository.namespace[0]);
  // parseSections(result.repository.namespace);
  parseNamespace(result.repository.namespace);
}
start();
