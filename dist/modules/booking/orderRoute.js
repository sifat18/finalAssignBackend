"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("./orderController");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const router = express_1.default.Router();
router.post("/orders", (0, auth_1.default)("client"), orderController_1.createOrder);
router.get("/orders", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), orderController_1.getAllOrders);
router.get("/orders/:id", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), orderController_1.singleOrder);
router.delete("/orders/:id", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), orderController_1.deleteService);
router.patch("/orders/:id", (0, auth_1.default)("admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), orderController_1.updateOrder);
exports.orderRoutes = router;
