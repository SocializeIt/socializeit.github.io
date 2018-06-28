"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport = require('passport');
let FacebookAuthController = class FacebookAuthController {
    get_auth() {
        return [
            { user: {
                    id: 1,
                    username: 'user1'
                } }
        ];
    }
    auth_callback(code) {
        console.log(code);
        return code;
    }
};
__decorate([
    common_1.Get('facebook')
], FacebookAuthController.prototype, "get_auth", null);
__decorate([
    common_1.Get('callback'),
    __param(0, common_1.Query())
], FacebookAuthController.prototype, "auth_callback", null);
FacebookAuthController = __decorate([
    common_1.Controller('auth')
], FacebookAuthController);
exports.FacebookAuthController = FacebookAuthController;
//# sourceMappingURL=auth.controller.js.map