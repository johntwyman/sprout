import * as React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Title from '../../components/Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Summary() {
  return (
    <React.Fragment>
      <Title>Summary</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        37 pledges
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Download pledge data
        </Link>
      </div>
    </React.Fragment>
  );
}