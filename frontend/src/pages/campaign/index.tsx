import React from 'react';
import { useParams } from 'react-router-dom';

import useCampaignsApi from '../../api/campaign';
import CampaignProvider from '../../context/ContextCampaign';
import Campaign from './Campaign';

const CampaignPage: React.FC = () => {
  const [campaign, setCampaign] = React.useState<ICampaign | null>(null);
  const { campaignName } = useParams();
  const { getPublicCampaign } = useCampaignsApi();

  React.useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getPublicCampaign(campaignName as string);
        if (response.data.campaign) {
          setCampaign(response.data.campaign);
        } else {
          setCampaign(null);
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [campaignName, campaign]);

  return (
    <CampaignProvider campaignId={campaign?._id ?? ''}>
      <Campaign />
    </CampaignProvider>
  );
};

export default CampaignPage;
