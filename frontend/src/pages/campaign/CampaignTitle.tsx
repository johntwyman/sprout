import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import GreensLogo from '../../assets/greenslogo.svg?react';

type CampaignTitleProps = {
  name: string;
};

const CampaignTitle: React.FC<CampaignTitleProps> = ({
  name,
}: CampaignTitleProps) => {
  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <GreensLogo style={{ transform: 'scale(5)' }}/>
      </Box>
      <Typography variant="h1" align="left" className="campaignpage-title-text">
        {name}
      </Typography>
    </>
  );
};

export default CampaignTitle;
