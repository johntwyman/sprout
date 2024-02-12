
import { AxiosResponse } from 'axios';

import useAxios from './useAxios';

const usePledgesApi = () => {
  const { get, del, post, put } = useAxios();

  return {
    getPledges: (campaignName?: string): Promise<AxiosResponse<ApiPledgeData>> => get(`pledges/${campaignName}`),
    getPledge: (_id: string): Promise<AxiosResponse<ApiPledgeData>> => get(`pledge/${_id}`),
    addPledge: (pledgeData: IPledge): Promise<AxiosResponse<ApiPledgeData>> => {
      const pledge: Omit<IPledge, "_id"> = {
        raw: pledgeData.raw,
        receivedAt: pledgeData.receivedAt,
        number: pledgeData.number,
        amount: pledgeData.amount,
        name: pledgeData.name,
        campaign_name: pledgeData.campaign_name,
        is_deleted: false,
      };
      return post(`pledge`, pledge);
    },
    updatePledge: (pledgeData: IPledge): Promise<AxiosResponse<ApiPledgeData>> => {
      const payload: Omit<IPledge, "_id"> = {
        raw: pledgeData.raw,
        receivedAt: pledgeData.receivedAt,
        number: pledgeData.number,
        amount: pledgeData.amount,
        name: pledgeData.name,
        campaign_name: pledgeData.campaign_name,
        is_deleted: pledgeData.is_deleted,
      };
      return put(`pledge/${pledgeData._id}`, payload);
    },
    deletePledge: (_id: string): Promise<AxiosResponse<ApiPledgeData>> => del(`pledge/${_id}`),
  }
};

export default usePledgesApi;
