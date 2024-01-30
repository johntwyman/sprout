import { Router } from 'express';

import {
    addCampaign, deleteCampaign, getCampaign, getCampaigns, updateCampaign
} from '../controllers/campaign';
import {
    addPledge, deletePledge, getPledge, getPledges, updatePledge
} from '../controllers/pledge';
import { addSMSPledge } from '../controllers/sms';

const router: Router = Router();

// Pledge routes
router.get("/pledges", getPledges);
router.get("/pledge/:id", getPledge);
router.post("/pledge", addPledge);
router.put("/pledge/:id", updatePledge);
router.delete("/pledge/:id", deletePledge);

// Inbound SMS route
router.post("/sms/:campaign_name", addSMSPledge);

// Campaign routes
router.get("/campaigns", getCampaigns);
router.get("/campaign/:id", getCampaign);
router.post("/campaign", addCampaign);
router.put('/campaign/:id', updateCampaign);
router.delete("/campaign/:id", deleteCampaign);

export default router;
