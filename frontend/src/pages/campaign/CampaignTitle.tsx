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
      <Box component="section" sx={{ p: 8 }}>
        <GreensLogo style={{ transform: 'scale(5)' }}/>
      </Box>
      <div className="campaignpage-title-text">
        {name}
      </div>
    </>
  );
};

export default CampaignTitle;
