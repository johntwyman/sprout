import { model, Schema } from 'mongoose';

import { IPledge } from '../types/pledge';

const pledgeSchema: Schema = new Schema(
  {
    raw: {
      type: String,
      required: true,
    },

    receivedAt: {
      type: Date,
      required: true,
    },

    number: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    campaign_name: {
      type: String,
      required: true,
    },

    is_deleted: {
      type: Boolean,
      default: false,
      expires: 0,
    }
  },
  { timestamps: true }
);

export default model<IPledge>("Pledge", pledgeSchema);

