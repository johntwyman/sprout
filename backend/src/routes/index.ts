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
router.get("/pledges", validateAccessToken, getPledges);
router.get("/pledge/:id", validateAccessToken, getPledge);
router.post("/pledge", validateAccessToken, addPledge);
router.put("/pledge/:id", validateAccessToken, updatePledge);
router.delete("/pledge/:id", validateAccessToken, deletePledge);
router.get("/pledges/:campaignName", validateAccessToken, getPledges);

// Campaign routes
router.get("/campaigns", validateAccessToken, getCampaigns);
router.get("/campaign/:campaignName", validateAccessToken, getCampaign);
router.post("/campaign", validateAccessToken, addCampaign);
router.put('/campaign/:id', validateAccessToken, updateCampaign);
router.delete("/campaign/:id", validateAccessToken, deleteCampaign);

// Inbound SMS route
router.post("/sms/:campaign_name", addSMSPledge);

// Public campaign page routes
router.get("/public/campaign/:name", getCampaign);
router.get("/public/campaign/:name/pledges", sendPledges);

export default router;
