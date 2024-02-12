import { Request, Response } from 'express';
import { Types } from 'mongoose';

import Pledge from '../../models/pledge';
import { IPledge } from '../../types/pledge';

const getPledges = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaignName = req.params.name;
    let pledges: IPledge[] = [];
    if (campaignName) {
      pledges = await Pledge.find({ campaign_name: campaignName });
    } else {
      pledges = await Pledge.find();
    }
    res.status(200).json({ pledges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getPledge = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if the id parameter is valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id as string)) {
      res.status(400).json({ message: "Invalid pledge ID" });
    } else {
      const pledge: IPledge | null = await Pledge.findById(req.params.id);
      if (!pledge) {
        res.status(404).json({ message: "Pledge not found" });
      } else {
        res.status(200).json({ pledge });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const addPledge = async (req: Request, res: Response): Promise<void> => {
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

const updatePledge = async (req: Request, res: Response): Promise<void> => {
  const {
    params: { id },
    body,
  } = req;
  const updatedPledge: IPledge | null = await Pledge.findByIdAndUpdate(
    { _id: id },
    body
  );
  const allPledges: IPledge[] = await Pledge.find();
  res.status(200).json({ message: "Pledge updated", pledge: updatedPledge, pledges: allPledges })
}

const deletePledge = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPledge: IPledge | null = await Pledge.findByIdAndDelete(req.params.id);
    const allPledges: IPledge[] = await Pledge.find();
    res.status(200).json({ message: "Pledge deleted", pledge: deletedPledge, pledges: allPledges })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const sendPledges = async (req: Request, res: Response) => {
  const campaignName = req.params.name;
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Send all existing pledges for the campaign
  res.write(`data: ${JSON.stringify({ pledges: await Pledge.find({ campaign_name: campaignName }).sort({ receivedAt: -1 }) })}\n\n`);

  // Create the change stream with filtering
  const changeStream = Pledge.watch(
    [{ $match: { 'fullDocument.campaign_name': campaignName } }],
    {
      fullDocument: 'updateLookup',
    }
  );

  // Handle change events and send updates
  changeStream.on('change', (change) => {
    const operation = change.operationType;
    const document = change.fullDocument;

    // Send update event
    res.write(`data: ${JSON.stringify({ operation, document })}\n\n`);
    console.log(`Operation: ${operation}`);
    console.log(`Document: ${JSON.stringify(document)}`);
  });

  // Handle errors and close connection
  res.on('error', (error) => {
    console.error("Error in SSE:", error);
    res.end();
  });

  req.on('close', () => {
    changeStream.close();
  });
}

export { getPledges, getPledge, addPledge, updatePledge, deletePledge, sendPledges };