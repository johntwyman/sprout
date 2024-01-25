import { Document } from 'mongoose';

export interface ICampaign extends Document {
  name: string,
  heading: string,
  initial_target: number,
  stretch_target: number,
  phone_number: string,
  sms_autoresponse: string,
  active: boolean,
}
