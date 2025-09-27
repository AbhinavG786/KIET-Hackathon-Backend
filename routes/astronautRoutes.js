import { fetchAstronauts } from "../controllers/astronautController.js";
import { Router } from "express";

const router = Router();    
router.get("/", fetchAstronauts);

export default router;