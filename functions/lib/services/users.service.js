"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const fbuser_dto_1 = require("../interfaces/fbuser.dto");
let UsersService = class UsersService {
    findOne(criteria) {
        return new fbuser_dto_1.fbUserDto();
    }
    findOneByEmail(email) {
        return admin.firestore().doc(`fbusers/${email}`).get(); //.then(u => u.data());
    }
    // async upsertFbUser(profile: Profile, accessToken: string) {
    //     let resultToReturn: fbUserDto;
    //     let existingUser = this.findOneByEmail(profile.id).then(u => resultToReturn = u.data() as fbUserDto).catch(e => console.log(e));
    //     try {
    //       if (!existingUser) {
    //         let savedUser = await this.saveUser({
    //           name: profile.displayName,
    //           email: profile.emails[0].value || null,
    //           avatarUrl: profile.photos[0].value || null,
    //           fb_id: profile.id,
    //           fb_token: accessToken
    //         });
    //         if (savedUser) {
    //           return savedUser;
    //         } else {
    //           return null;
    //         }
    //       }
    //       else {
    //         return existingUser;
    //       }
    //     } catch (e) {
    //       console.log('[user.svc->upsertFbUser()');
    //       console.dir(e);
    //       return null;
    //     }    
    // }
    saveUser(user) { return {}; }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map