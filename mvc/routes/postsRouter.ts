import { Router } from "express";
import { postController } from "../controllers/postsController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
const router = Router();

//   /api/posts

router.get("/", postController.getAll);
router.post("/", AuthMiddleware, postController.create);

export default router;
