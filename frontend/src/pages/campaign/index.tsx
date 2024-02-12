import React from 'react';
import { useParams } from 'react-router-dom';

import useCampaignsApi from '../../api/campaign';
import Campaign from './Campaign';

const CampaignPage: React.FC = () => {
  const [campaign, setCampaign] = React.useState<ICampaign | null>(null);
  const { name } = useParams();
  const { getPublicCampaign } = useCampaignsApi();

  React.useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getPublicCampaign(name as string);
        setCampaign(response.data.campaign || null); // Set to null if no campaign found
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [name]); // Only re-run when campaignName or getPublicCampaign change

  return (
    <>
      {campaign && <Campaign campaign={campaign} />}
    </>
  );
};

export default CampaignPage;