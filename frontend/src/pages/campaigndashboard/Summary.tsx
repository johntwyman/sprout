import * as React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Title from '../../components/Title';
import { usePledgesContext } from './Context';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type SummaryProps = {
  initialTarget: number;
  stretchTarget: number;
}

const Summary: React.FC<SummaryProps> = ({ initialTarget, stretchTarget }) => {
  const { pledges } = usePledgesContext();
  // create a const totalAmount that is the sum of the amount key in the pledges array
  const total = pledges.reduce((acc, pledge) => acc + pledge.amount, 0);
  const formatter = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });
  const amountPledged = formatter.format(total);
  const numberPledges = pledges.length;

  return (
    <React.Fragment>
      <Title>Summary</Title>
      <Typography component="p" variant="h4">
        {amountPledged}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {numberPledges} pledges
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Initial target: {formatter.format(initialTarget)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Stretch target: {formatter.format(stretchTarget)}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Download pledge data
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Summary;
