import React from 'react';

import useCampaignsApi from '../../api/campaign';

const newCampaign: ICampaign = {
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

export const CampaignProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [campaign, setCampaign] = React.useState<ICampaign>();
    const { getCampaign } = useCampaignsApi();

  React.useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaign(_id);
        setCampaign(response.data.campaign);
      } catch (error) {
        console.error("Error fetching pledges:", error);
      }
    };

    fetchCampaign();
  }, []);

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
