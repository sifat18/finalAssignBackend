import express from "express";
import { createAdmin } from "./adminController";
import validateRequest from "../../middlewears/validateRequest";
import { AdminValidation } from "./adminValidation";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "./adminConstant";

const router = express.Router();

router.post(
  "/admins/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  auth(Admin_ROLE.SUPER_ADMIN),
  createAdmin
);

export const adminRoutes = router;
