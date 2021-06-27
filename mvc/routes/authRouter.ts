import { Router } from "express";
import { authController } from "../controllers/authController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
const router = Router();
//  /api/auth
router.post("/sign-up", authController.signUp);
router.post("/log-in", authController.logIn);
router.get("/is-auth", AuthMiddleware, authController.isAuth);

export default router;
