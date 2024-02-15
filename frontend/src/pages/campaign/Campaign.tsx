import * as React from 'react';

import { Grid } from '@mui/material';

import GreensLogo from '../../assets/greenslogo.svg?react';
import CampaignTitle from './CampaignTitle';
import HowTo from './HowTo';
import LatestPledges from './LatestPledges';
import ProgressBar from './ProgressBar';

interface CampaignProps {
  campaign: ICampaign;
}

const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
  return (
    <Grid
      container
      sx={{ display: "flex", bgcolor: "#007239", minHeight: "98vh" }}
    >
      <GreensLogo style={{ position: "fixed", top: 60, left: 60, zIndex: 100, transform: "scale(5)" }} />

      <Grid item xs={12} md={8} sx={{ mt: 8 }}>
        <Grid
          container
          spacing={2}
          sx={{ height: "100%", alignItems: "stretch" }}
        >
          <Grid item xs={12}>
            <CampaignTitle name={campaign.heading} />
          </Grid>
          <Grid item xs={12}>
            <ProgressBar campaign={ campaign } />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        component="aside"
        sx={{ height: "100%", mt: 8 }}
      >
          <HowTo phoneNumber={campaign.phone_number} />
          <LatestPledges campaignName={campaign.name} />
      </Grid>
    </Grid>
  );
};

export default Campaign;
