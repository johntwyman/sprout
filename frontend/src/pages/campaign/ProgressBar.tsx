import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

type ProgressBarProps = {
  campaign: ICampaign;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ campaign }) => {
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

      // Initial event from the backend SSE stream does not conform to the standard SSE data model
      if (operation === undefined) {
        setPledges(JSON.parse(event.data).pledges);
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

  const amountPledged = pledges.reduce((acc, pledge) => acc + pledge.amount, 0);
  const targetAmount =
    amountPledged < initialTarget ? initialTarget : stretchTarget;

  const progressPercentage = (amountPledged / targetAmount) * 100;
  const progressWidth = `${progressPercentage}%`;

  return (
    <>
      <Typography
        variant="h2"
        sx={{ p: 8, fontWeight: "bold", color: "white", display: "inline" }}
      >
        ${amountPledged}
      </Typography>
      <Typography
        variant="h4"
        sx={{ p: 2, fontWeight: "bold", color: "white", display: "inline" }}
      >
        {" "}
        OF{" "}
      </Typography>
      {targetAmount === stretchTarget && (
        <>
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            color: "white",
            display: "inline",
            textDecoration: "line-through",
          }}
        >
          ${initialTarget}
        </Typography>
        <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "white", display: "inline" }}
      >
        {" "}
      </Typography>
        </>
      )}
      <Typography
        variant="h4"
        sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "white",
          display: "inline",
        }}
      >
        ${targetAmount}
      </Typography>

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
            margin: "5px 10px",
          }}
        />
      </Box>
    </>
  );
};

export default ProgressBar;
