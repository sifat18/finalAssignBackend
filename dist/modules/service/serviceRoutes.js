"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const serviceController_1 = require("./serviceController");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const validateRequest_1 = __importDefault(require("../../middlewears/validateRequest"));
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router.post("/create-services", (0, auth_1.default)("admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.createServiceZodSchema), serviceController_1.createService);
router.get("/services", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), serviceController_1.getAllService);
router.get("/services/:id", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), serviceController_1.getSingleService);
router.patch("/services/:id", (0, auth_1.default)("admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), serviceController_1.updateService);
router.delete("/services/:id", (0, auth_1.default)("admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), serviceController_1.deleteService);
exports.ServiceRoutes = router;
