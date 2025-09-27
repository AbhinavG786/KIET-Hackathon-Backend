import { uploadVideo } from "../controllers/uploadController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { Router } from "express";
import upload from "../utils/multer.js"

const router = Router();

router.post("/video", upload.single("file"), uploadVideo);

export default router;