import { Router } from 'express';

import {
    addCampaign, deleteCampaign, getCampaign, getCampaigns, updateCampaign
} from '../controllers/campaign';
import {
    addPledge, deletePledge, getPledge, getPledges, sendPledges, updatePledge
} from '../controllers/pledge';
import { addSMSPledge } from '../controllers/sms';
import { validateAccessToken } from '../middleware/auth0.middleware';

const router: Router = Router();

// Pledge routes
router.get("/protected/pledges", validateAccessToken, getPledges);
router.get("/protected/pledge/:id", validateAccessToken, getPledge);
router.post("/protected/pledge", validateAccessToken, addPledge);
router.put("/protected/pledge/:id", validateAccessToken, updatePledge);
router.delete("/protected/pledge/:id", validateAccessToken, deletePledge);
router.get("/protected/pledges/:campaignName", validateAccessToken, getPledges);

// Campaign routes
router.get("/protected/campaigns", validateAccessToken, getCampaigns);
router.get("/protected/campaign/:campaignName", validateAccessToken, getCampaign);
router.post("/protected/campaign", validateAccessToken, addCampaign);
router.put('/protected/campaign/:id', validateAccessToken, updateCampaign);
router.delete("/protected/campaign/:id", validateAccessToken, deleteCampaign);

// Inbound SMS route
router.post("/sms/:campaign_name", addSMSPledge);

// Public campaign page routes
router.get("/public/campaign/:name", getCampaign);
router.get("/public/campaign/:name/pledges", sendPledges);

export default router;
