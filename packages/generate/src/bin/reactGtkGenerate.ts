/*
 *  File: /src/bin/reactGtkGenerate.ts
 *  Project: @react-gtk/generate
 *  File Created: 07-12-2023 05:28:04
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

import pkg from '../../package.json';
import { Generator, Kind } from '../generator';
import { program } from 'commander';

const logger = console;

export default async function main() {
  program
    .version(pkg.version)
    .description('generate react gtk binding')
    .option('-o, --out <path>', 'specify output path')
    .argument('<kind>', 'specify kind to generate')
    .parse(process.argv);
  const options = program.opts();
  const kind = program.args[0];
  if (!Object.values(Kind).includes(kind as Kind)) {
    logger.error(`invalid kind: ${kind}`);
    process.exit(1);
  }
  const generator = new Generator({
    outDir: options.out,
    kind: kind as Kind,
  });
  await generator.generate();
}
