import { Document } from 'mongoose';

export interface IPledge extends Document {
  raw: string,
  receivedAt: string,
  number: string,
  amount: string,
  name: string,
  campaign_name: string,
}
