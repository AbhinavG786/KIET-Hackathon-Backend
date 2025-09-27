import { uploadVideo } from "../controllers/uploadController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/video", verifyJWT, uploadVideo);

export default router;