
import axios, { AxiosResponse } from 'axios';

const baseUrl: string = "http://localhost:4000";

export const getPledges = async (campaign_name?: string): Promise<AxiosResponse<ApiPledgeData>> => {
  try {
    const pledges: AxiosResponse<ApiPledgeData> = await axios.get(
      baseUrl + "/pledges", {
      params: { campaign_name },
    })
    return pledges;
  }
  catch (error) {
    throw new Error('Error retrieving pledges');
  }
}

export const getPledge = async (_id: string): Promise<AxiosResponse<ApiPledgeData>> => {
  try {
    const pledge: AxiosResponse<ApiPledgeData> = await axios.get(
      baseUrl + `/pledge/${_id}`
    )
    return pledge;
  }
  catch (error) {
    throw new Error('Error retrieving pledge');
  }
}

export const addPledge = async (pledgeData: IPledge): Promise<AxiosResponse<ApiPledgeData>> => {
  try {
    const pledge: Omit<IPledge, "_id"> = {
      raw: pledgeData.raw,
      receivedAt: pledgeData.receivedAt,
      number: pledgeData.number,
      amount: pledgeData.amount,
      name: pledgeData.name,
      campaign_name: pledgeData.campaign_name,
    };
    const savePledge: AxiosResponse<ApiPledgeData> = await axios.post(
      baseUrl + "/pledge",
      pledge)
    return savePledge;
  } catch (error) {
    throw new Error('Error creating pledge');
  }
}

export const updatePledge = async (pledgeData: IPledge): Promise<AxiosResponse<ApiPledgeData>> => {
  try {
    const payload: Omit<IPledge, "_id"> = {
      raw: pledgeData.raw,
      receivedAt: pledgeData.receivedAt,
      number: pledgeData.number,
      amount: pledgeData.amount,
      name: pledgeData.name,
      campaign_name: pledgeData.campaign_name,
    };

    const updatedPledge: AxiosResponse<ApiPledgeData> = await axios.put(
      `${baseUrl}/pledge/${pledgeData._id}`,
      payload
    );
    return updatedPledge;
  } catch (error) {
    throw new Error('Error updating pledge');
  }
}

export const deletePledge = async (_id: string): Promise<AxiosResponse<ApiPledgeData>> => {
  try {
    const deletedPledge: AxiosResponse<ApiPledgeData> = await axios.delete(`${baseUrl}/pledge/${_id}`);
    return deletedPledge;
  } catch (error) {
    throw new Error('Error deleting pledge');
  }
}
