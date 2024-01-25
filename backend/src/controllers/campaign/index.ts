import { Response, Request } from "express";
import { ICampaign } from "../../types/campaign";
import Campaign from "../../models/campaign";

const getCampaigns = async (_req: Request, res: Response): Promise<void> => {
  const campaigns: ICampaign[] = await Campaign.find();
  res.status(200).json({ campaigns });
}

const getCampaign = async (req: Request, res: Response): Promise<void> => {
  const campaign: ICampaign | null = await Campaign.findById(req.params.id);
  res.status(200).json({ campaign });
}

const addCampaign = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
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
  const deletedCampaign: ICampaign | null = await Campaign.findByIdAndDelete(req.params.id);
  const allCampaigns: ICampaign[] = await Campaign.find();

  res.status(200).json({ message: "Campaign deleted", campaign: deletedCampaign, campaigns: allCampaigns })

}

export { getCampaigns, getCampaign, addCampaign, updateCampaign, deleteCampaign };