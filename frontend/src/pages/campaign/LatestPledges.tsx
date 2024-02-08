import React from 'react';

import { List, ListItem, ListItemText } from '@mui/material';

interface LatestPledgesProps {
  campaignName: string;
}

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const LatestPledges: React.FC<LatestPledgesProps> = ({ campaignName }) => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);

  React.useEffect(() => {
    const url = `${import.meta.env.VITE_API_SERVER_URL}/public/campaign/${campaignName}/pledges`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const { operation, document } = JSON.parse(event.data);

      // Initial event from the backend SSE stream does not conform to the standard SSE data model
      if (operation === undefined) {
        setPledges(JSON.parse(event.data).pledges);
      } else if (operation === 'insert') {
        setPledges([...pledges, document]);
      } else if (operation === 'update') {
        setPledges((prevPledges) =>
          prevPledges.map((pledge) => (pledge._id === document._id ? document : pledge))
        )
      } else if (operation === 'delete') {
        setPledges(pledges.filter((pledge) => pledge._id !== document._id));
      }
    }

    return () => {
      eventSource.close();
    }
  }, [campaignName]);

  // Sort and slice pledges to just show the four latest pledges
  const latestPledges = pledges.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt)).slice(0, 4);

  return (
    <div>
      <h2>Latest Pledges</h2>
      <p>Campaign: {campaignName}</p>
      <List>
        {latestPledges.map((pledge) => (
          <ListItem key={pledge._id}>
            <ListItemText primary={pledge.name} secondary={formatter.format(pledge.amount)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default LatestPledges;