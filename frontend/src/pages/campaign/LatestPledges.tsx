import React from 'react';

import { Box } from '@mui/material';

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

      // Initial event from the backend SSE stream does not conform to the standard SSE data model
      if (operation === undefined) {
        setPledges(JSON.parse(event.data).pledges.slice(0, 5));
      }

      // Handle operations
      if (operation === "insert") {
        setPledges((prevPledges) => [...prevPledges, document]);
      } else if (operation === "update") {
        setPledges((prevPledges) =>
          prevPledges.map((pledge) =>
            pledge._id === document._id ? document : pledge
          )
        );

        if (document.is_deleted) {
          setPledges((prevPledges) =>
            prevPledges.filter((pledge) => pledge._id !== document._id)
          );
        }
      }
    };

    // Cleanup function to close the eventSource
    return () => {
      eventSource.close();
    };
  }, [campaignName]);

  React.useEffect(() => {
  }, [pledges]);

  return (
    <Box sx={{ pl: 2 }}>
      {pledges
        .sort((a, b) => (b.receivedAt > a.receivedAt ? 1 : -1)).slice(0, 5)
        .map((pledge) => (
          <Pledge key={pledge._id} name={pledge.name} amount={pledge.amount} />
        ))}
    </Box>
  );
};

export default LatestPledges;
