import { AxiosResponse } from 'axios';

import useAxios from './useAxios';

const useCampaignsApi = () => {
  const { get, del, post, put } = useAxios();

  return {
    getCampaigns: (): Promise<AxiosResponse<ApiCampaignData>> => get(`campaigns`),
    getCampaign: (name: string): Promise<AxiosResponse<ApiCampaignData>> => get(`campaign/${name}`),
    getPublicCampaign: (name: string): Promise<AxiosResponse<ApiCampaignData>> => get(`public/campaign/${name}`),
    addCampaign: (campaignData: ICampaign): Promise<AxiosResponse<ApiCampaignData>> => {
      const campaign: Omit<ICampaign, "_id"> = {
        name: campaignData.name,
        heading: campaignData.heading,
        initial_target: campaignData.initial_target,
        stretch_target: campaignData.stretch_target,
        phone_number: campaignData.phone_number,
        sms_autoresponse: campaignData.sms_autoresponse,
        active: true,
      };
      return post(`campaign`, campaign);
    },
    updateCampaign: (campaignData: ICampaign): Promise<AxiosResponse<ApiCampaignData>> => {
      const payload: Omit<ICampaign, "_id"> = {
        name: campaignData.name,
        heading: campaignData.heading,
        initial_target: campaignData.initial_target,
        stretch_target: campaignData.stretch_target,
        phone_number: campaignData.phone_number,
        sms_autoresponse: campaignData.sms_autoresponse,
        active: campaignData.active,
      };
      return put(`campaign/${campaignData._id}`, payload);
    },
    deleteCampaign: (_id: string): Promise<AxiosResponse<ApiCampaignData>> => del(`campaign/${_id}`),
  }
};

export default useCampaignsApi;
