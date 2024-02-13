import * as React from 'react';

import Grid from '@mui/material/Grid';

import GreensLogo from '../../assets/greenslogo.svg?react';
import CampaignTitle from './CampaignTitle';
import HowTo from './HowTo';
import LatestPledges from './LatestPledges';
import Thermometer from './Thermometer';

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
            <Thermometer campaign={ campaign } />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
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
