import express from "express";
import { createOrder, getAllOrders, singleOrder } from "./orderController";
import auth from "../../middlewears/auth";
import { Admin_ROLE } from "../admin/adminConstant";

const router = express.Router();

router.post("/orders", auth("client"), createOrder);
router.get(
  "/orders",
  auth("client", Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  getAllOrders
);
router.get(
  "/orders/:id",
  auth("client", Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  singleOrder
);
router.delete(
  "/orders/:id",
  auth("client", Admin_ROLE.ADMIN, Admin_ROLE.SUPER_ADMIN),
  singleOrder
);
export const orderRoutes = router;
