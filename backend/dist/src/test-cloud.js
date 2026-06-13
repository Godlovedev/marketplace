"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cloundinary_1 = __importDefault(require("./config/cloundinary"));
async function test() {
    console.log('Cloudinary configuré !', cloundinary_1.default.config());
}
test();
//# sourceMappingURL=test-cloud.js.map