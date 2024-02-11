import React from 'react';
import QRCode from 'react-qr-code';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
    <Paper elevation={3} sx={{ bgcolor: 'white', borderRadius: 2, padding: 2, margin: 2}}>
      <Typography variant="h4">How to Pledge</Typography>
      <Typography variant="body1">Text {phoneNumber} with your name and pledge amount.</Typography>
      <br />
      <Typography variant="body1">Example: "Adam Bandt $100"</Typography>
      <br />
      <Typography variant="body1">You can also scan the QR code below to pledge.</Typography>
      <Box>
        <QRCode size={256} style={{ height: "auto", maxWidth: "50%", width: "50%" }} value={qrCode} viewBox={`0 0 256 256`}/>
        </Box>

    </Paper>

  )
}

export default HowTo;