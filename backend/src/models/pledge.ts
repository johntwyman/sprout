import { IPledge } from "../types/pledge";
import { model, Schema } from "mongoose";

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
    }
  },
  { timestamps: true }
);

export default model<IPledge>("Pledge", pledgeSchema);

