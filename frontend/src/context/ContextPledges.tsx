import React from 'react';

import usePledgesApi from '../api/pledge';

export const PledgesContext = React.createContext<PledgeContextType>({
  pledges: [],
  setPledges: () => {},
});

export const PledgesProvider: React.FC<{
  children: React.ReactNode;
  campaign: ICampaign;
}> = ({ children, campaign }) => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);
  const { getPledges } = usePledgesApi();

  React.useEffect(() => {
    const fetchPledges = async () => {
      try {
        const response = await getPledges(campaign.name);
        setPledges(response.data.pledges);
      } catch (error) {
        console.error("Error fetching pledges:", error);
      }
    };

    fetchPledges();

    // refresh pledges every minute if the campaign is active
    if (campaign.active) {
      const intervalId = setInterval(() => {
        fetchPledges();
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [campaign]);

  return (
    <PledgesContext.Provider value={{ pledges, setPledges }}>
      {children}
    </PledgesContext.Provider>
  );
};

export const usePledgesContext = () => {
  return React.useContext(PledgesContext);
};

export default PledgesProvider;
