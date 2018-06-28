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
const admin = require("firebase-admin");
let UsersService = class UsersService {
    /**
     *
     */
    constructor() {
    }
    findOneByEmail(email) {
        return admin.firestore().doc(`fbusers/${email}`).get().then(u => u.data());
    }
    upsertFbUser(profile, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let existingUser = yield this.findOneByEmail(profile.id);
            try {
                if (!existingUser) {
                    let savedUser = yield this.saveUser({
                        name: profile.displayName,
                        email: profile.emails[0].value || null,
                        avatarUrl: profile.photos[0].value || null,
                        fb_id: profile.id,
                        fb_token: accessToken
                    });
                    if (savedUser) {
                        return savedUser;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return existingUser;
                }
            }
            catch (e) {
                console.log('[user.svc->upsertFbUser()');
                console.dir(e);
                return null;
            }
        });
    }
    saveUser(user) {
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map