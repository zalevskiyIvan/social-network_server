import { Router } from "express";
import { conversationController } from "../controllers/conversationController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post(`/`, AuthMiddleware, conversationController.createConversation);
router.get("/", conversationController.getConversation);

export default router;
