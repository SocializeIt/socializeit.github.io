import { Controller, Get, Query } from '@nestjs/common';
const passport = require('passport');

@Controller('auth')
export class FacebookAuthController {
    @Get('facebook')
    get_auth() {
        return [
            { user: {
                id: 1,
                username: 'user1'
            }}
        ];
    }

    @Get('callback')
    auth_callback(@Query() code) {
        console.log(code);
        return code;
    }
}