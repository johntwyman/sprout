
import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getPledges = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const pledges: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/pledges"
    )
    return pledges;
  }
  catch (error) {
    throw new Error('Error retrieving pledges');
  }
}

export const addPledge = async (pledgeData: IPledge): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const pledge: Omit<IPledge, "_id"> = {
      raw: pledgeData.raw,
      receivedAt: pledgeData.receivedAt,
      number: pledgeData.number,
      amount: pledgeData.amount,
      name: pledgeData.name,
      campaign_name: pledgeData.campaign_name,
    };
console.log(pledge);
    const savePledge: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/addpledge",
      pledge)
    return savePledge;
  } catch (error) {
    throw new Error('Error creating pledge');
  }
}

export const deletePledge = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedPledge: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/deletepledge/${_id}`);
    return deletedPledge;
  } catch (error) {
    throw new Error('Error deleting pledge');
  }
}