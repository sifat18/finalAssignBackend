"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("./reviewController");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const router = express_1.default.Router();
router.post("/create-review", (0, auth_1.default)("client"), reviewController_1.createReview);
router.get("/reviews", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), reviewController_1.getAllReview);
router.get("/reviews-for-all", reviewController_1.getAllReviewForAll);
router.get("/reviews/:id", (0, auth_1.default)("admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */, "client"), reviewController_1.singleReview);
router.patch("/reviews/:id", (0, auth_1.default)("client"), reviewController_1.updateReview);
router.delete("/reviews/:id", (0, auth_1.default)("client", "admin" /* Admin_ROLE.ADMIN */, "super-admin" /* Admin_ROLE.SUPER_ADMIN */), reviewController_1.deleteService);
exports.ReviewRoutes = router;
