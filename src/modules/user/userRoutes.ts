import express from "express";
import {
  deleteUser,
  getAllUser,
  getProfile,
  getSingleUser,
  updateUser,
  updateUserProfile,
} from "./userController";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/adminConstant";

const router = express.Router();

router.get(
  "/users",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  getAllUser
);
router.get(
  "/users/my-profile",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN, "client"),
  getProfile
);
router.patch(
  "/users/my-profile",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN, "client"),
  updateUserProfile
);
router.get(
  "/users/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  getSingleUser
);
router.patch(
  "/users/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  updateUser
);
router.delete(
  "/users/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  deleteUser
);

export const UserRoutes = router;
