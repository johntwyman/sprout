import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { getPledges } from '../../api/pledge';

export const PledgesContext = React.createContext<PledgeContextType>({
  pledges: [],
  setPledges: () => {},
});

export const PledgesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);
  const campaign = useLoaderData() as ICampaign;

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
