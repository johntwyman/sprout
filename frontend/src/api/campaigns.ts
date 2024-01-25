
import axios, { Axios, AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getCampaigns = async (): Promise<AxiosResponse<ApiCampaignData>> => {
  try {
    const campaigns: AxiosResponse<ApiCampaignData> = await axios.get(`${baseUrl}/campaigns`);
    return campaigns;
  } catch (error) {
    throw new Error('Error retrieving campaigns');
  }
}

export const getCampaign = async (_id: string): Promise<AxiosResponse<ApiCampaignData>> => {
  try {
    const campaign: AxiosResponse<ApiCampaignData> = await axios.get(`${baseUrl}/campaign/${_id}`);
    return campaign;
  } catch (error) {
    throw new Error('Error retrieving campaign');
  }
}

export const addCampaign = async (campaignData: ICampaign): Promise<AxiosResponse<ApiCampaignData>> => {
  try {
    const campaign: Omit<ICampaign, "_id"> = {
      name: campaignData.name,
      heading: campaignData.heading,
      initial_target: campaignData.initial_target,
      stretch_target: campaignData.stretch_target,
      phone_number: campaignData.phone_number,
      sms_autoresponse: campaignData.sms_autoresponse,
      active: true,
    };
    const saveCampaign: AxiosResponse<ApiCampaignData> = await axios.post(
      baseUrl + `/campaign`,
      campaign
    );
    return saveCampaign;
  } catch (error) {
    throw new Error('Error adding campaign');
  }
}

export const updateCampaign = async (campaignData: ICampaign): Promise<AxiosResponse<ApiCampaignData>> => {
  try {
    const payload: Omit<ICampaign, "_id"> = {
      name: campaignData.name,
      heading: campaignData.heading,
      initial_target: campaignData.initial_target,
      stretch_target: campaignData.stretch_target,
      phone_number: campaignData.phone_number,
      sms_autoresponse: campaignData.sms_autoresponse,
      active: campaignData.active,
    };

    const updatedCampaign: AxiosResponse<ApiCampaignData> = await axios.put(
      `${baseUrl}/campaign/${campaignData._id}`,
      payload
    );
    return updatedCampaign;

  } catch (error) {
    throw new Error('Error updating campaign');
  }
}

export const deleteCampaign = async (_id: string): Promise<AxiosResponse<ApiCampaignData>> => {
  try {
    const deletedCampaign: AxiosResponse<ApiCampaignData> = await axios.delete(`${baseUrl}/campaign/${_id}`);
    return deletedCampaign;
  } catch (error) {
    throw new Error('Error deleting campaign');
  }
}