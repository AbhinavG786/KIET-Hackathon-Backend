import { fetchAstronauts,fetchAlertsForAstronaut } from "../controllers/astronautController.js";
import { Router } from "express";

const router = Router();    

router.get("/alerts/:astronautId", fetchAlertsForAstronaut);
router.get("/", fetchAstronauts);

export default router;