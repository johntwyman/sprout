import * as React from 'react';

import Box from '@mui/material/Box';

const Pledge = (name: string, amount: number) => {
  return (
    <Box>
      <h3>{name}</h3>
      <p>{amount}</p>
    </Box>
  );
}