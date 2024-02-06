import React from 'react';

import useCampaignsApi from '../api/campaign';

const newCampaign = {
  _id: "",
  name: "",
  heading: "",
  initial_target: 0,
  stretch_target: 0,
  phone_number: "",
  sms_autoresponse: "",
  active: true,
};

export const CampaignContext = React.createContext<CampaignContextType>({
  campaign: newCampaign,
  setCampaign: () => {},
});

export const CampaignProvider: React.FC<{
  children: React.ReactNode;
  campaignId: string;
}> = ({ children, campaignId }) => {
  const [campaign, setCampaign] = React.useState<ICampaign>(newCampaign);

  const { getCampaign } = useCampaignsApi();

  React.useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaign(campaignId);
        if (response.data.campaign) {
          setCampaign(response.data.campaign);
        } else {
          setCampaign(newCampaign);
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [campaignId, campaign]);

  return (
    <CampaignContext.Provider value={{ campaign, setCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => {
  return React.useContext(CampaignContext);
};

export default CampaignProvider;
