import { Router } from "express";
import { mesageController } from "../controllers/messageController";
const router = Router();

router.get(`/`, mesageController.get);
router.post(`/`, mesageController.create);

export default router;
