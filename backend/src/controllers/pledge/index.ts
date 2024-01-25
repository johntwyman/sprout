import { Response, Request } from "express";
import { IPledge } from "../../types/pledge";
import Pledge from "../../models/pledge";

const getPledges = async (_req: Request, res: Response): Promise<void> => {
  const pledges: IPledge[] = await Pledge.find();
  res.status(200).json({ pledges });

}

const addPledge = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  const body = req.body as Pick<IPledge, "raw" | "receivedAt" | "number" | "amount" | "name" | "campaign_name">;
  const pledge: IPledge = new Pledge({
    raw: body.raw,
    receivedAt: body.receivedAt,
    number: body.number,
    amount: body.amount,
    name: body.name,
    campaign_name: body.campaign_name,
  });

  const newPledge: IPledge = await pledge.save();
  const allPledges: IPledge[] = await Pledge.find();

  res.status(201).json({ message: "Pledge added", pledge: newPledge, pledges: allPledges })
}

const deletePledge = async (req: Request, res: Response): Promise<void> => {
  const deletedPledge: IPledge | null = await Pledge.findByIdAndDelete(req.params.id);
  const allPledges: IPledge[] = await Pledge.find();

  res.status(200).json({ message: "Pledge deleted", pledge: deletedPledge, pledges: allPledges })

}

export { getPledges, addPledge, deletePledge };