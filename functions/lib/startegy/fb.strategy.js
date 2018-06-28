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
const passport = require("passport");
const config_1 = require("config");
const FBTokenStrategy = require("passport-facebook-token");
const common_1 = require("@nestjs/common");
let FBStrategy = class FBStrategy extends FBTokenStrategy {
    constructor(auth) {
        super({
            clientID: config_1.get('secrets.fb.appId'),
            clientSecret: config_1.get('secrets.fb.appSecret')
        }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            yield this.verifyFb(accessToken, refreshToken, profile, done);
        }));
        this.auth = auth;
        passport.use(this);
    }
    verifyFb(accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[fb.strategy->verifyFb():: accessToken: ${accessToken}, profile: ${JSON.stringify(profile)}`);
            try {
                const isValid = yield this.auth.validateOrCreateFbUser(profile, accessToken);
                if (!isValid) {
                    return done('Unauthorized', null);
                }
                return done(null, profile);
            }
            catch (error) {
                console.log(`[fb.strategy->verifyFb() Catch block]:: error ${JSON.stringify(error)}`);
            }
        });
    }
    validate(token, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.auth.validateUser(token);
            if (!user) {
                return done(new common_1.UnauthorizedException(), false);
            }
            done(null, user);
        });
    }
};
FBStrategy = __decorate([
    common_1.Injectable()
], FBStrategy);
exports.FBStrategy = FBStrategy;
//# sourceMappingURL=fb.strategy.js.map