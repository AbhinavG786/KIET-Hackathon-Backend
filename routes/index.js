import { Router } from "express";
import authRoutes from "./authRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import astronautRoutes from "./astronautRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/astronauts", astronautRoutes);

export default router;  