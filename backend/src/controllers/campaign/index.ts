import { Request, Response } from 'express';
import { Types } from 'mongoose';

import Campaign from '../../models/campaign';
import { ICampaign } from '../../types/campaign';

const getCampaigns = async (_req: Request, res: Response): Promise<void> => {
  try {
    const campaigns: ICampaign[] = await Campaign.find();
    res.status(200).json({ campaigns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if the id parameter is valid ObjectId
    // but we can always assume it will exist because of how the routes are set up
    // in main.tsx in the frontend
    if (!Types.ObjectId.isValid(req.params.id as string)) {
      res.status(400).json({ message: "Invalid campaign ID" });
    } else {
      const campaign: ICampaign | null = await Campaign.findById(req.params.id);
      if (!campaign) {
        res.status(404).json({ message: "Campaign not found" });
      } else {
        res.status(200).json({ campaign });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const addCampaign = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Pick<ICampaign, "name" | "heading" | "initial_target" | "stretch_target" | "phone_number" | "sms_autoresponse" | "active">;
  const campaign: ICampaign = new Campaign({
    name: body.name,
    heading: body.heading,
    initial_target: body.initial_target,
    stretch_target: body.stretch_target,
    phone_number: body.phone_number,
    sms_autoresponse: body.sms_autoresponse,
    active: body.active,
  });
  const newCampaign: ICampaign = await campaign.save();
  const allCampaigns: ICampaign[] = await Campaign.find();
  res.status(201).json({ message: "Campaign added", campaign: newCampaign, campaigns: allCampaigns })
}

const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  const {
    params: { id },
    body,
  } = req;
  const updatedCampaign: ICampaign | null = await Campaign.findByIdAndUpdate(
    { _id: id },
    body
  );
  const allCampaigns: ICampaign[] = await Campaign.find();
  res.status(200).json({ message: "Campaign updated", campaign: updatedCampaign, campaigns: allCampaigns })
}

const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCampaign: ICampaign | null = await Campaign.findByIdAndDelete(req.params.id);
    const allCampaigns: ICampaign[] = await Campaign.find();
    res.status(200).json({ message: "Campaign deleted", campaign: deletedCampaign, campaigns: allCampaigns })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { getCampaigns, getCampaign, addCampaign, updateCampaign, deleteCampaign };