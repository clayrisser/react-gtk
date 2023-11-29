#!/bin/sh

rm packages/binding/src/index.ts
cd packages/binding/src/elements
mv Element.ts ../_Element.ts
rm -rf ./*.ts
mv ../_Element.ts Element.ts
