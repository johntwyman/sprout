import { ICampaign } from "../types/campaign";
import { model, Schema } from "mongoose";

const campaignSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    initial_target: {
      type: Number,
      required: true,
    },
    stretch_target: {
      type: Number,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    sms_autoresponse: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICampaign>("Campaign", campaignSchema);

