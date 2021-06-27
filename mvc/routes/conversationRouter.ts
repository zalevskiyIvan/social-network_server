import { Router } from "express";
import { conversationController } from "../controllers/conversationController";
const router = Router();

router.post(`/`, conversationController.createConversation);
router.get("/", conversationController.getConversation);

export default router;
