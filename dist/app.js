"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routeNotFound_1 = __importDefault(require("./app/middlewares/routeNotFound"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://mecha-mania.netlify.app',
        'https://mecha-mania.vercel.app',
    ],
    credentials: true,
}));
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Server Running!');
});
app.use(globalErrorHandler_1.default);
app.use(routeNotFound_1.default);
exports.default = app;
