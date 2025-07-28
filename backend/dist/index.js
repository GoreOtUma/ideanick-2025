"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ctx_1 = require("./lib/ctx");
const env_1 = require("./lib/env");
const passport_1 = require("./lib/passport");
const trpc_1 = require("./lib/trpc");
const router_1 = require("./router");
const presetDB_1 = require("./scripts/presetDB");
void (async () => {
    let ctx = null;
    try {
        ctx = (0, ctx_1.createAppContext)();
        await (0, presetDB_1.presetDb)(ctx);
        const expressApp = (0, express_1.default)();
        expressApp.use((0, cors_1.default)());
        expressApp.get('/ping', (req, res) => {
            res.send('pong');
        });
        (0, passport_1.applyPassportToExpressApp)(expressApp, ctx);
        await (0, trpc_1.applyTrpcToExpressApp)(expressApp, ctx, router_1.trpcRouter);
        expressApp.listen(env_1.env.PORT, () => {
            console.info(`Listening at http://localhost:${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error(error);
        await ctx?.stop();
    }
})();
//# sourceMappingURL=index.js.map