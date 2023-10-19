"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("./adminController");
const validateRequest_1 = __importDefault(require("../../middlewears/validateRequest"));
const adminValidation_1 = require("./adminValidation");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const router = express_1.default.Router();
router.post("/admins/create-admin", (0, validateRequest_1.default)(adminValidation_1.AdminValidation.createAdminZodSchema), (0, auth_1.default)("super-admin" /* Admin_ROLE.SUPER_ADMIN */), adminController_1.createAdmin);
router.get("/admins", (0, auth_1.default)("super-admin" /* Admin_ROLE.SUPER_ADMIN */), adminController_1.getAllAdmin);
router.get("/admin/:id", (0, auth_1.default)("super-admin" /* Admin_ROLE.SUPER_ADMIN */), adminController_1.getSingleAdmin);
router.patch("/admin/:id", (0, auth_1.default)("super-admin" /* Admin_ROLE.SUPER_ADMIN */), adminController_1.updateAdmin);
router.delete("/admin/:id", (0, auth_1.default)("super-admin" /* Admin_ROLE.SUPER_ADMIN */), adminController_1.deleteAdmin);
exports.adminRoutes = router;
