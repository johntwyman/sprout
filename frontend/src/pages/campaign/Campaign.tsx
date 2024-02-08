import * as React from 'react';

import Grid from '@mui/material/Grid';

import CampaignTitle from './CampaignTitle';
import LatestPledges from './LatestPledges';

interface CampaignProps {
  campaign: ICampaign;
}

const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
  return (
    <Grid
      container
      sx={{ display: "flex", bgcolor: "#007239", minHeight: "100vh" }}
    >
      <Grid item xs={12} md={8}>
        <Grid
          container
          spacing={2}
          sx={{ height: "100%", alignItems: "stretch" }}
        >
          <Grid item xs={12}>
            <CampaignTitle name={campaign.heading} />
          </Grid>
          <Grid item xs={12}>
            {/* TBC */}
          </Grid>
          <Grid item xs={12}>
            {/* TBC */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} component="aside">
        <Grid container direction="column" spacing={2} sx={{ heigh: "100%" }}>
          <Grid item>{/* HowTo Component */}</Grid>
          <Grid item>
            <LatestPledges campaignName={campaign.name} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Campaign;
