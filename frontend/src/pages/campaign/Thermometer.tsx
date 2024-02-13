import React from 'react';

import { Box, Grid } from '@mui/material';

type ThermometerProps = {
  campaign: ICampaign;
};

const Thermometer: React.FC<ThermometerProps> = ({ campaign }) => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);
  const campaignName = campaign.name;
  const initialTarget = campaign.initial_target;
  const stretchTarget = campaign.stretch_target;

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

  const amountPledged = pledges.reduce((acc, pledge) => acc + pledge.amount, 0);

  const progressPercentage = (amountPledged / initialTarget) * 100;
  const progressWidth = `${progressPercentage}%`;

  return (
    <Box
      sx={{
        bgcolor: "#005221",
        borderRadius: 2,
        height: 100,
        width: "80%",
        display: "flex",
        alignItems: "center",
        margin: "10px 40px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#d9d9d9",
          borderRadius: 2,
          height: 80,
          width: progressWidth,
          margin: '5px 10px',
        }}
      />
    </Box>
  );
};

export default Thermometer;
