import React from 'react';
import { useParams } from 'react-router-dom';

import CampaignProvider from '../../context/ContextCampaign';
import Dashboard from './Dashboard';

const CampaignDashboard: React.FC = () => {
const { campaignName } = useParams();

  return (
    <CampaignProvider campaignName={campaignName ?? ''}>
      <Dashboard />
    </CampaignProvider>
  );
};

export default CampaignDashboard;
