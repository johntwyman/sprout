import '@fontsource/anton';

import React from 'react';

import Box from '@mui/material/Box';

interface CampaignTitleProps {
  name: string;
}

const CampaignTitle: React.FC<CampaignTitleProps> = ({ name }) => {
  return (
      <Box sx={{ p: 6 }}>
        <div className="campaignpage-title-container">
          <div className="campaignpage-title-text">{name}</div>
        </div>
      </Box>
  );
};

export default CampaignTitle;
