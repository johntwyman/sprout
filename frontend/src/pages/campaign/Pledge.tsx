import { motion } from 'framer-motion';
import * as React from 'react';

import { Paper, Typography } from '@mui/material';

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
          padding: "1rem",
          margin: "1rem",
          width: "50%",
        }}
      >
        <Typography variant="pledgeName">{name}</Typography>
        <Typography variant="pledgeAmount">${amount}</Typography>
      </Paper>
    </motion.div>
  );
};

export default Pledge;
