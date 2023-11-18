import express from "express";
import { createUser } from "./authController";
import validateRequest from "../../middlewears/validateRequest";
import { UserValidation } from "./user.validation";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(UserValidation.createUserZodSchema),
  createUser
);
// router.post(
//   "/auth/signin",
//   validateRequest(AuthValidation.loginZodSchema),
//   loginUser
// );
// router.post(
//   "/auth/refresh-token",
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   getRefreshToken
// );
export const authRoutes = router;
