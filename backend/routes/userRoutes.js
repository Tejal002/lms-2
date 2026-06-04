import { Router } from "express";
import { createUserController, loginController, logout,getMe } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router =new Router();

router.post("/create",createUserController);
router.post("/login",loginController);
router.post("/logout",authMiddleware,logout);
router.get("/me",authMiddleware,getMe)

export default router;