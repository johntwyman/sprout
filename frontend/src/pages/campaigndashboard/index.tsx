import React from 'react';
import { useParams } from 'react-router-dom';

import { Campaign } from '@mui/icons-material';

import useCampaignsApi from '../../api/campaign';
import Dashboard from './Dashboard';

const CampaignDashboard: React.FC = () => {
  const [campaign, setCampaign] = React.useState<ICampaign | null>(null);
  const { name } = useParams();
  const { getCampaign } = useCampaignsApi();

  React.useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaign(name as string);
        setCampaign(response.data.campaign || null); // Set to null if no campaign found
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [name]);

  return (
    <>
      {campaign && <Dashboard campaign={campaign} />}
    </>
  );
};

export default CampaignDashboard;
