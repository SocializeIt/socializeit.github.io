import { Injectable, Controller, Get, Post, Put, Delete, Query, Res, Req } from '@nestjs/common';
const passport = require('passport');

@Controller('twitter')
export class TwitterController {
    @Get('auth')
    authenticate() {
        passport.authenticate('twitter', (err, profile, info) => {
            console.log(err);
            console.log(profile);
            console.log(info);
        })
    }
}
