import express from "express";
import {
  deleteService,
  getAllService,
  getSingleService,
  updateService,
  createService,
} from "./serviceController";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/adminConstant";
import validateRequest from "../../middlewears/validateRequest";
import { ServiceValidation } from "./service.validation";

const router = express.Router();

router.post(
  "/create-services",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.createServiceZodSchema),
  createService
);
router.get(
  "/services",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  getAllService
);
router.get(
  "/services/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  getSingleService
);
router.patch(
  "/services/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  updateService
);
router.delete(
  "/services/:id",
  auth(Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  deleteService
);

export const ServiceRoutes = router;
