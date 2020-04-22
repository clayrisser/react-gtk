#!/usr/bin/env node

if (require.main === module) {
  require('./lib/bin');
} else {
  throw new Error("module 'bin' cannot be imported");
}
