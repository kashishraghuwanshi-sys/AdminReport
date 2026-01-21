import { Router } from "express";
import { getAdminReport } from "../controllers/report.controller.js";

const router = Router();

router.get("/", getAdminReport);


export default router;
