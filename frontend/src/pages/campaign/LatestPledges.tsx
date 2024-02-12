import { produce } from 'immer';
import React from 'react';

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
        setPledges(JSON.parse(event.data).pledges.slice(0, 5));
      }

      if (operation === "insert") {
        const existingIndex = pledges.findIndex(
          (pledge) => pledge._id === document._id
        );
        setPledges((prevPledges) => {
          if (existingIndex === -1) {
            // Insert only if pledge doesn't exist
            return [...prevPledges.slice(0, 4), document];
          } else {
            // Update existing pledge if found
            prevPledges[existingIndex] = {
              ...prevPledges[existingIndex],
              ...document,
            };
            return prevPledges;
          }
        });
      }

      if (operation === "update") {
        const index = pledges.findIndex(
          (pledge) => pledge._id === document._id
        );
        if (index !== -1) {
          if (document.is_deleted) {
            setPledges((prevPledges) => {
              // Directly return the filtered array to trigger re-render
              return prevPledges.filter((p) => p._id !== document._id);
            });
          } else {
            setPledges((prevPledges) => {
              prevPledges[index] = { ...prevPledges[index], ...document };
              return prevPledges;
            });
          }
        }
      }
    };

    // Cleanup function to close the eventSource
    return () => {
      eventSource.close();
    };
  }, [campaignName]);

  React.useEffect(() => {
    console.log(`Pledges: ${JSON.stringify(pledges)}`);
  }, [pledges]);

  return (
    <>
      {pledges
        .sort((a, b) => (b.receivedAt > a.receivedAt ? 1 : -1))
        .map((pledge) => (
          <Pledge key={pledge._id} name={pledge.name} amount={pledge.amount} />
        ))}
    </>
  );
};

export default LatestPledges;
