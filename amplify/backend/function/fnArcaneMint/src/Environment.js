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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNumberEnvVar = exports.extractStringEnvVar = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function extractStringEnvVar(key) {
    let result = process.env[key];
    if (result === undefined) {
        console.error(`Environment variable ${key} cannot be undefined`);
        process.exit(1);
    }
    return result;
}
exports.extractStringEnvVar = extractStringEnvVar;
function extractNumberEnvVar(key) {
    let result = Number(process.env[key]);
    // result === result checks for NaN
    if (result === undefined || !(result === result)) {
        console.error(`Environment variable ${key} cannot be undefined`);
        process.exit(1);
    }
    return result;
}
exports.extractNumberEnvVar = extractNumberEnvVar;
