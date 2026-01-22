import { Router } from "express";
import { getUsersByType } from "../controllers/adminUsers.controller.js";

const router = Router();

router.get("/", getUsersByType);

export default router;
