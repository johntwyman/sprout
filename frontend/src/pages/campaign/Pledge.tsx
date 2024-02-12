import { motion } from 'framer-motion';
import * as React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface PledgeProps {
  name: string;
  amount: number;
}

const Pledge: React.FC<PledgeProps> = ({ name, amount }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <Paper
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          padding: 2,
          width: 1 / 2,
          margin: 2,
        }}
      >
        <Typography variant="pledgeName">{name}</Typography>
        <Typography variant="pledgeAmount">${amount}</Typography>
      </Paper>
    </motion.div>
  );
};

export default Pledge;
