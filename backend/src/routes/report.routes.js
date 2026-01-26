import { Router } from "express";
import { getAdminReport } from "../controllers/report.controller.js";
import { getNotRenewedUsers } from "../controllers/notRenewed.js";

const router = Router();

router.get("/", getAdminReport);
router.get("/not-renewed", getNotRenewedUsers);


export default router;



