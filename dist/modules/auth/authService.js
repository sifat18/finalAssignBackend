"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshTokenService = exports.loginUserService = exports.createUserService = void 0;
const config_1 = __importDefault(require("../../config"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const userModel_1 = require("../user/userModel");
// creating user
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.service)
        user.service = "normal";
    const createdUser = yield userModel_1.User.create(user);
    if (!createdUser) {
        throw new APIError_1.default(400, "failed to create User");
    }
    return createdUser;
});
exports.createUserService = createUserService;
// login
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield userModel_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new APIError_1.default(404, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield userModel_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new APIError_1.default(401, "Password is incorrect");
    }
    //create access token & refresh token
    const { _id, role, service } = isUserExist;
    const accessToken = (0, jwtHelper_1.createToken)({ _id, role, email, service }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelper_1.createToken)({ _id, role, email, service }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.loginUserService = loginUserService;
// getrefresh
const getRefreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelper_1.verifyToken)(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new APIError_1.default(403, "Invalid Refresh Token");
    }
    const { email } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield userModel_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new APIError_1.default(404, "User does not exist");
    }
    //generate new token
    const newAccessToken = (0, jwtHelper_1.createToken)({
        _id: isUserExist._id,
        role: isUserExist.role,
        email: isUserExist.email,
        service: isUserExist.service,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.getRefreshTokenService = getRefreshTokenService;
