import express from "express";
import { createUser, loginUser, getRefreshToken } from "./authController";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middlewears/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(UserValidation.createUserZodSchema),
  createUser
);
router.post(
  "/auth/login",
  validateRequest(AuthValidation.loginZodSchema),
  loginUser
);
router.post(
  "/auth/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),

  getRefreshToken
);
export const authRoutes = router;
