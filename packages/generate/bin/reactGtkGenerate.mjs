#!/usr/bin/env node

import { fileURLToPath } from 'url';
import main from '../lib/bin/reactGtkGenerate.mjs';

if (import.meta.url === `file://${fileURLToPath(new URL(import.meta.url))}`) {
  main();
}
