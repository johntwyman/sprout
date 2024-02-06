import React from 'react';
import { useParams } from 'react-router-dom';

import CampaignProvider from '../../context/ContextCampaign';
import Dashboard from './Dashboard';

const CampaignDashboard: React.FC = () => {
const { campaignId } = useParams();

  return (
    <CampaignProvider campaignId={campaignId ?? ''}>
      <Dashboard />
    </CampaignProvider>
  );
};

export default CampaignDashboard;
