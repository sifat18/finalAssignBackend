import express from "express";
import {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} from "./adminController";
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
router.get("/admins", auth(Admin_ROLE.SUPER_ADMIN), getAllAdmin);
router.get("/admin/:id", auth(Admin_ROLE.SUPER_ADMIN), getSingleAdmin);
router.patch("/admin/:id", auth(Admin_ROLE.SUPER_ADMIN), updateAdmin);

router.delete("/admin/:id", auth(Admin_ROLE.SUPER_ADMIN), deleteAdmin);
export const adminRoutes = router;
