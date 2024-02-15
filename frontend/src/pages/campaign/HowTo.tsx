import React from 'react';
import QRCode from 'react-qr-code';

import { Box, Paper, Typography } from '@mui/material';

interface HowToProps {
  phoneNumber: string;
}

function toInternationalFormat(number: string) {
  // Remove all formatting and non-numeric characters
  const cleanNumber = number.replace(/\D/g, "");

  // Check if the number starts with "+61" (already international)
  if (cleanNumber.startsWith("+61")) {
    return cleanNumber;
  }

  // Otherwise, add "+61" and remove leading zeroes
  return "+61" + cleanNumber.replace(/^0/, "");
}

const HowTo: React.FC<HowToProps> = ({ phoneNumber }) => {
  const qrCode = `SMSTO:${toInternationalFormat(phoneNumber)}: `;

  return (
    <Box sx={{ pl: 2 }}>
      <Typography variant="h2" sx={{color: "white", fontWeight: "bold", mt: 4, p: 2 }}>
        {phoneNumber}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          alignItems: "flex-start",
          bgcolor: "white",
          borderRadius: 2,
          padding: 2,
          margin: 2,
          maxWidth: "40%",
        }}
      >
        <Box display="flex" justifyContent="center">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrCode}
            viewBox={`0 0 256 256`}
          />
        </Box>
      </Paper>
      <Typography variant="h4" sx={{color: "white", fontWeight: "bold", mt: 2, p: 2 }}>
        Text your name and amount<br />eg. "Adam $250"
      </Typography>
    </Box>
  );
};

export default HowTo;
