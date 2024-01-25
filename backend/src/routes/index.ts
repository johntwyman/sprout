import { Router } from "express";
import { getPledges, addPledge, deletePledge } from "../controllers/pledge";

const router: Router = Router();

router.get("/pledges", getPledges);
router.post("/addpledge", addPledge);
router.delete("/deletepledge/:id", deletePledge);

export default router;
