import React from 'react';
import { useParams } from 'react-router-dom';

import useCampaignsApi from '../../api/campaign';
import Campaign from './Campaign';

const CampaignPage: React.FC = () => {
  const [campaign, setCampaign] = React.useState<ICampaign | null>(null);
  const { campaignName } = useParams();
  const { getPublicCampaign } = useCampaignsApi();

  React.useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getPublicCampaign(campaignName as string);
        setCampaign(response.data.campaign || null); // Set to null if no campaign found
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [campaignName]); // Only re-run when campaignName or getPublicCampaign change

  return (
    <>
      {campaign && <Campaign campaign={campaign} />}
    </>
  );
};

export default CampaignPage;