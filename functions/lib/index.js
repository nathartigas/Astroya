"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssrlandingpageastroya = void 0;
const functions = __importStar(require("firebase-functions"));
const next_1 = __importDefault(require("next"));
const path_1 = __importDefault(require("path"));
const nextApp = (0, next_1.default)({
    dev: false,
    conf: {
        distDir: ".next",
    },
    dir: path_1.default.resolve(__dirname, "..", "..")
});
exports.ssrlandingpageastroya = functions.https.onRequest(async (req, res) => {
    try {
        await nextApp.prepare();
        const handler = nextApp.getRequestHandler();
        return handler(req, res);
    }
    catch (error) {
        console.error("Erro no servidor Next.js:", error);
        res.status(500).send("Erro interno do servidor");
    }
});
//# sourceMappingURL=index.js.map