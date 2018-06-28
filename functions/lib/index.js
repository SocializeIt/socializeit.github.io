"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const FacebookStrategy = require('passport-facebook').Strategy;
const server = express();
const startNestApp = (expressInstance) => __awaiter(this, void 0, void 0, function* () {
    const app = core_1.NestFactory.create(app_module_1.AppModule, expressInstance);
    app.then(instance => {
        instance.use(cors());
        passport.use(new FacebookStrategy({
            clientID: '636207509774692',
            clientSecret: 'c3048a2745b2973133478e0a8f3f99bc',
            callbackURL: 'http://localhost:5001/socialize-it/us-central1/api/auth/callback',
            redirectURL: 'http://localhost:5001/socialize-it/us-central1/api/auth/callback'
        }, (t, u, i) => { console.log(t, u, i); }));
        console.log('pasport', JSON.stringify(passport));
        instance.use(passport.initialize({ userProperty: 'user' }));
        instance.init();
    });
});
startNestApp(server);
server.route('/auth/facebook/oauth')
    .get(passport.authenticate('facebook', function (err, user, info) {
    console.log(err);
    console.log(user);
    console.log(info);
}));
exports.api = functions.https.onRequest(server);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map