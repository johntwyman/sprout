import '@fontsource/anton';

import React from 'react';

import Box from '@mui/material/Box';

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
      <Box sx={{ p: 6 }}>
        <div className="campaignpage-title-container">
      <div className="campaignpage-title-text">
        {name}
      </div>
        </div>
      </Box>
    </>
  );
};

export default CampaignTitle;
