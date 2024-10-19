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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const svix_1 = require("svix");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const User_model_1 = require("./User.model");
const clerkWebhooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whook = new svix_1.Webhook(config_1.default.clerk_webhook_secret);
        yield whook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        });
        const { data, type } = req.body;
        switch (type) {
            case 'user.created': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };
                yield User_model_1.User.create(userData);
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'User created successfully',
                    data: {},
                });
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };
                yield User_model_1.User.findOneAndUpdate({ clerkId: data.id }, userData);
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'User updated successfully',
                    data: {},
                });
                break;
            }
            case 'user.deleted': {
                yield User_model_1.User.findOneAndDelete({ clerkId: data.id });
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'User deleted successfully',
                    data: {},
                });
                break;
            }
            default:
                break;
        }
    }
    catch (err) {
        console.log(err.message);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong.');
    }
}));
exports.UserController = {
    clerkWebhooks,
};
