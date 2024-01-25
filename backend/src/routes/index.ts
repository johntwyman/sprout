import { Router } from "express";
import { getPledges, getPledge, addPledge, updatePledge, deletePledge } from "../controllers/pledge";
import { getCampaigns, getCampaign, addCampaign, updateCampaign, deleteCampaign } from "../controllers/campaign";

const router: Router = Router();

// Pledge routes
router.get("/pledges", getPledges);
router.get("/pledge/:id", getPledge);
router.post("/pledge", addPledge);
router.put("/pledge/:id", updatePledge);
router.delete("/pledge/:id", deletePledge);

// Campaign routes
router.get("/campaigns", getCampaigns);
router.get("/campaign/:id", getCampaign);
router.post("/campaign", addCampaign);
router.put('/campaign/:id', updateCampaign);
router.delete("/campaign/:id", deleteCampaign);

export default router;
