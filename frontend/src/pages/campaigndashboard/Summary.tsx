import * as React from 'react';
import { useCSVDownloader } from 'react-papaparse';
import { useLoaderData } from 'react-router-dom';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Title from '../../components/Title';
import { usePledgesContext } from './ContextPledges';

type SummaryProps = {
  initialTarget: number;
  stretchTarget: number;
};

interface CSVData {
  name: string;
  mobile: string;
  amount: number;
  message: string;
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const prepareCSVData = (pledges: IPledge[]): CSVData[] =>
  pledges.map((pledge) => {
    try {
      const parsedBody = JSON.parse(pledge.raw).Body as string;
      return {
        name: pledge.name,
        mobile: pledge.number,
        amount: pledge.amount,
        message: parsedBody,
      };
    } catch (error) {
      console.error('Error parsing JSON data for download:', pledge._id, error);
      return {
        name: pledge.name,
        mobile: pledge.number,
        amount: pledge.amount,
        message: pledge.raw, // Default to raw data if parsing fails
      };
    }
  });

const Summary: React.FC<SummaryProps> = ({ initialTarget, stretchTarget }) => {
  const { pledges } = usePledgesContext();
  const campaign = useLoaderData() as ICampaign;
  const total = pledges.reduce((acc, pledge) => acc + pledge.amount, 0);
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });
  const amountPledged = formatter.format(total);
  const numberPledges = pledges.length;

  const { CSVDownloader, Type } = useCSVDownloader();

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
          <CSVDownloader
            type={Type.Link}
            filename={`${campaign.name}-pledges`}
            bom={true}
            data={prepareCSVData(pledges)}
          >
            Download pledge data
          </CSVDownloader>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Summary;
