import React from 'react';
import render, { Label, Box } from '@react-gtk/render';
import util from 'util';

console.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(
  <>
    <Box>
      <Label>howdy</Label>
      hi
    </Box>
  </>
);

console.log('\n\n======== RENDERED OUTPUT ========');
console.log(util.inspect(renderedOutput, false, null, true));
console.log('\n\n--------------');
