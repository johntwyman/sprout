import * as React from 'react';

import Grid from '@mui/material/Grid';

import GreensLogo from '../../assets/greenslogo.svg?react';
import CampaignTitle from './CampaignTitle';
import HowTo from './HowTo';
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
      <Grid item component="section" xs={12} sx={{ p: 8 }}>
        <GreensLogo style={{ transform: "scale(5)" }} />
      </Grid>
      <Grid item xs={12} md={9}>
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
        </Grid>
      </Grid>
      <Grid
        item
        direction="column"
        xs={12}
        md={3}
        component="aside"
        sx={{ height: "100%" }}
      >
          <HowTo phoneNumber={campaign.phone_number} />
          <LatestPledges campaignName={campaign.name} />
      </Grid>
    </Grid>
  );
};

export default Campaign;
