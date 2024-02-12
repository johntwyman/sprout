import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Pledge from './Pledge';

interface LatestPledgesProps {
  campaignName: string;
}

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const LatestPledges: React.FC<LatestPledgesProps> = ({ campaignName }) => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);

  // useEffect to retrieve pledges
  React.useEffect(() => {
    const url = `${import.meta.env.VITE_API_SERVER_URL}/public/campaign/${campaignName}/pledges`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const { operation, document } = JSON.parse(event.data);
      console.log(`Operation: ${operation}`);
      console.log(`Document: ${JSON.stringify(document)}`);
      console.log(`Pledges: ${JSON.stringify(pledges)}`);

      // Initial event from the backend SSE stream does not conform to the standard SSE data model
      if (operation === undefined) {
        setPledges(JSON.parse(event.data).pledges);
      } else if (operation === "insert") {
        setPledges([...pledges, document]);
      } else if (operation === "update") {
        setPledges((prevPledges) =>
          prevPledges.map((pledge) =>
            pledge._id === document._id ? document : pledge
          )
        );
      } else if (operation === "delete") {
        setPledges(pledges.filter((pledge) => pledge._id !== document._id));
      }
    };

    return () => {
      eventSource.close();
    };
  }, [campaignName]);

  // Sort and slice pledges to just show the four latest pledges

  return (
    <>
      {pledges
        .sort((a, b) => (b.receivedAt > a.receivedAt ? 1 : -1))
        .slice(0, 4)
        .map((pledge) => (
          <Pledge key={pledge._id} name={pledge.name} amount={pledge.amount} />
        ))}
    </>
  );
};

export default LatestPledges;
