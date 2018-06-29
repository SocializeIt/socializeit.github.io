import { Controller, Get, Query } from '@nestjs/common';
import * as passport from 'passport';

@Controller('auth')
export class AuthController {
    @Get('facebook')
    facebook() {
        passport.authenticate('facebook', (e, p, i) =>{
            return { p, i }
        });
        return { }; 
    }
}