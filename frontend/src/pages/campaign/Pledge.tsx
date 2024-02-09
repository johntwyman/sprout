import * as React from 'react';

import Paper from '@mui/material/Paper';

interface PledgeProps {
  name: string;
  amount: number;
}

const Pledge: React.FC<PledgeProps> = ({name, amount}) => {
  return (
    <Paper sx={{bgcolor: 'white', borderRadius: 2 }}>
      <h3>{name}</h3>
      <p>{amount}</p>
    </Paper>
  );
}

export default Pledge;