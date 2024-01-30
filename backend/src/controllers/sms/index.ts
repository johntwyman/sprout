import { Request, Response } from 'express';

import extractPledge from '../../helpers/extractPledge';
import Campaign from '../../models/campaign';
import Pledge from '../../models/pledge';
import { ICampaign } from '../../types/campaign';
import { IPledge } from '../../types/pledge';

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/‘/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Twilio webhooks for inbound SMS send POST requests
// that contain request parameters including From, To and Body
// we extract and process the Body parameter to add a pledge
export const addSMSPledge = async (req: Request, res: Response): Promise<void> => {
  try {
    if (Object.prototype.hasOwnProperty.call(req.query, 'key') && req.query.key === process.env.SMS_KEY) {
      const extractedPledge = extractPledge(req.body.Body);
      if (!extractedPledge.amount) {
        res.status(200)
          .header('Content-Type', 'application/xml')
          .send(`<Response><Sms>Sorry, we didn't get your pledge amount. Can you try again, in the format 'Jane Doe $500'?</Sms></Response>`);
        return;
      }
      if (!extractedPledge.name) {
        res.status(200)
          .header('Content-Type', 'application/xml')
          .send(`<Response><Sms>Sorry, we didn't get your name. Can you try again, in the format 'Jane Doe $500'?</Sms></Response>`);
        return;
      }
      const pledge: IPledge = new Pledge({
        raw: JSON.stringify(req.body),
        receivedAt: new Date(),
        number: req.body.From,
        amount: extractedPledge.amount,
        name: extractedPledge.name,
        campaign_name: req.params.campaign_name as string,
      });
      const newPledge: IPledge = await pledge.save();
      console.log(`New pledge: ${newPledge._id}`);
      const campaign: ICampaign | null = await Campaign.findOne({ name: req.params.campaign_name });
      if (!campaign) {
        console.log('NO SUCH CAMPAIGN: ' + req.params.campaign_name);
        res.status(400).json({ message: "Bad request: campaign not found" });
        return;
      }
      if (!campaign.active) {
        console.log('CAMPAIGN INACTIVE: ' + req.params.campaign_name);
        res.status(400).json({ message: "Bad request: campaign is inactive" });
        return;
      }
      res.status(200)
        .header('Content-Type', 'application/xml')
        .send(`<Response><Sms>${escapeHtml(campaign.sms_autoresponse)}</Sms></Response>`);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
