import React from 'react';
import render, { Box } from '@react-gtk/render';
import util from 'util';

console.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(
  <>
    <Box />
  </>
);

console.log('\n\n======== RENDERED OUTPUT ========');
console.log(util.inspect(renderedOutput, false, null, true));
console.log('\n\n--------------');
