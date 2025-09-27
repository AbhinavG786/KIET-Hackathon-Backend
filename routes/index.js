import { Router } from "express";
import authRoutes from "./authRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);

export default router;  