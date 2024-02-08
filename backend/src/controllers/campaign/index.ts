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
    // We will receive either 'id' or 'name' as a parameter.
    // We search the collection using the appropriate method.
    let campaign: ICampaign | null = null;
    if (Types.ObjectId.isValid(req.params.id as string)) {
      campaign = await Campaign.findById(req.params.id);
    } else {
      campaign = await Campaign.findOne({ name: req.params.name });
    }
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
    } else {
      res.status(200).json({ campaign });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const addCampaign = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Pick<ICampaign, "name" | "heading" | "initial_target" | "stretch_target" | "phone_number" | "sms_autoresponse" | "active">;
    // Check for existing campaign with the same name
    const existingCampaign = await Campaign.findOne({ name: body.name });
    if (existingCampaign) {
      res.status(409).json({ message: "Campaign with the same name already exists" });
      return;
    }
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
  // Check for existing campaign with the same name, excluding the current campaign being updated
  const existingCampaign = await Campaign.findOne({ name: body.name, _id: { $ne: id } });
  if (existingCampaign) {
    res.status(409).json({ message: "Campaign with that name already exists" });
    return;
  }
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