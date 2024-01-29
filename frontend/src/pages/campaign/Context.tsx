import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { getPledges } from '../../api/pledge';

export const PledgesContext = React.createContext<PledgeContextType | null>(null);

export const PledgesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);

  React.useEffect(() => {
    const fetchPledges = async () => {
      try {
        const campaign = useLoaderData() as ICampaign;
        const response = await getPledges(campaign.name);
        setPledges(response.data.pledges);
      } catch (error) {
        console.error("Error fetching pledges:", error);
      }
    };

    fetchPledges();
  }, []);

  return (
    <PledgesContext.Provider value={{ pledges, setPledges }}>
      {children}
    </PledgesContext.Provider>
  );
};

export const usePledges = () => {
  return React.useContext(PledgesContext);
};

export default PledgesProvider;