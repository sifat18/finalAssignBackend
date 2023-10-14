import express from "express";
import {
  createReview,
  getAllReview,
  singleReview,
  updateReview,
  deleteService,
} from "./reviewController";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/adminConstant";

const router = express.Router();

router.post("/create-review", auth("client"), createReview);
router.get(
  "/reviews",
  auth("client", Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  getAllReview
);
router.get(
  "/reviews/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN, "client"),
  singleReview
);
router.patch("/reviews/:id", auth("client"), updateReview);
router.delete(
  "/reviews/:id",
  auth("client", Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  deleteService
);

export const UserRoutes = router;
