import * as React from 'react';

import { Box, Grid, List, ListItem, ListItemText } from '@mui/material/';

import CampaignTitle from './CampaignTitle';

const data = [
  {
    _id: "23452efw2354",
    name: "John",
    amount: 500,
  },
  {
    _id: "gefdlkj34565t",
    name: "Sue",
    amount: 300,
  },
  {
    _id: "vlkj34oijjr3g",
    name: "Tasma",
    amount: 375,
  },
  {
    _id: "vefoji34t5089u",
    name: "Bob",
    amount: 125
  }
];

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

interface CampaignProps {
  campaign: ICampaign;
}

const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#007239', minHeight: '100vh' }}>
      <Box sx={{ flex: '0 0 70%' }}>
        {' '}
        {/* Content (70% width) */}
        <Grid container spacing={2} sx={{ height: '100%', alignItems: 'stretch' }}>
          <Grid item xs={12} >
            <CampaignTitle name={campaign.heading} />
          </Grid>
          <Grid item xs={12}>
          {/* TBC */}
          </Grid>
          <Grid item xs={12}>
          {/* TBC */}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flex: '0 0 30%' }}>
        {' '}
        {/* Sidebar (30% width) */}
        <Box sx={{ height: '30%', bgcolor: '#0000ff' }}>{/* HowTo Component */}</Box>
        <Box sx={{ height: '70%', bgcolor: '#ff0000' }}>
          <List>
            {data.map((pledge) => (
              <ListItem key={pledge._id}>
                <ListItemText primary={`${pledge.name} ${formatter.format(pledge.amount)}`} />
            </ListItem>
            ))}
          </List></Box>
      </Box>
    </Box>
  );
}

export default Campaign;
