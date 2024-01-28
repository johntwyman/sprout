import React, { useEffect, useState } from 'react';
import CampaignItem from '../../../components/CampaignItem';
import AddCampaign from '../../../components/AddCampaign';
import { getCampaigns, addCampaign, deleteCampaign } from '../../../api/campaigns';

const ScratchCampaign: React.FC = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    fetchCampaigns()
  }, []);

  const fetchCampaigns = (): void => {
    getCampaigns()
    .then(({ data: { campaigns } }: ICampaign[] | any) => setCampaigns(campaigns))
    .catch((err: Error) => console.log(err));
  }

const handleSaveCampaign = (e: React.FormEvent, formData: ICampaign): void => {
  e.preventDefault();
  addCampaign(formData).then(({ status, data }) => {
    if (status !== 201) {
      throw new Error('Error! Campaign not saved')
    }
    setCampaigns(data.campaigns)
  })
  .catch((err) => console.log(err))
}

const handleDeleteCampaign = (_id: string): void => {
  deleteCampaign(_id).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Campaign not deleted')
      }
      setCampaigns(data.campaigns)
    })
    .catch((error) => console.log("Error! Campaign not deleted"))
}

  return (
    <main className='App'>
      <h1>My Campaigns</h1>
      <AddCampaign saveCampaign={handleSaveCampaign} />
      {campaigns.map((campaign: ICampaign) => (
        <CampaignItem
          key={campaign._id}
          deleteCampaign={handleDeleteCampaign}
          campaign={campaign}
        />
      ))}
    </main>
  )
}

export default ScratchCampaign;