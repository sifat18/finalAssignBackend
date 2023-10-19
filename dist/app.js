"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./middlewears/globalErrorHandler");
const userRoutes_1 = require("./modules/user/userRoutes");
const authRoutes_1 = require("./modules/auth/authRoutes");
const adminRoutes_1 = require("./modules/admin/adminRoutes");
const orderRoute_1 = require("./modules/booking/orderRoute");
const serviceRoutes_1 = require("./modules/service/serviceRoutes");
const reviewRoutes_1 = require("./modules/reviews/reviewRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://main--heartfelt-fudge-0ec8f6.netlify.app/",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", userRoutes_1.UserRoutes);
app.use("/api/v1", authRoutes_1.authRoutes);
app.use("/api/v1", adminRoutes_1.adminRoutes);
app.use("/api/v1", orderRoute_1.orderRoutes);
app.use("/api/v1", serviceRoutes_1.ServiceRoutes);
app.use("/api/v1", reviewRoutes_1.ReviewRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// error handler
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
