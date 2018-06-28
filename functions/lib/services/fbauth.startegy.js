"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("config");
let AuthService = class AuthService {
    constructor(userSvc) {
        this.userSvc = userSvc;
    }
    createToken(fb_id, name, email) {
        const expiresIn = 60 * 60 * 24 * 60, secretOrKey = config_1.get('secrets.jwtStr');
        let user = { fb_id, name, email };
        return jwt.sign(user, secretOrKey, { expiresIn });
    }
    validateJwtUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userSvc.findOne({ fb_id: payload.fb_id });
            if (user) {
                return user.fb_id;
            }
            else {
                console.log(`[auth.service->validateJwtUser()]:: user is ${JSON.stringify(user)}`);
                return null;
            }
        });
    }
    validateOrCreateFbUser(profile, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fbUser = yield this.userSvc.upsertFbUser(profile, accessToken);
                if (fbUser) {
                    return fbUser;
                }
                else {
                    console.log(`[auth.service->validateOrCreateFbUser()]:: user is ${JSON.stringify(fbUser)}`);
                    return null;
                }
            }
            catch (e) {
                console.log(`[auth.svc->validateORCreateFbUser()]:: ${JSON.stringify(e)}`);
                return null;
            }
        });
    }
};
AuthService = __decorate([
    common_1.Component()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=fbauth.startegy.js.map