import * as passport from 'passport';
import { get } from 'config';
import * as FBTokenStrategy from 'passport-facebook-token';

import { Injectable, UnauthorizedException} from '@nestjs/common'
import { AuthService } from '../services/auth.service';

@Injectable()
export class FBStrategy extends  FBTokenStrategy {//  PassportStrategy(Strategy) {
    constructor(private readonly auth: AuthService) {
        super({
            clientID: get<string>('secrets.fb.appId'),
            clientSecret: get<string>('secrets.fb.appSecret')
        },
        async (accessToken, refreshToken, profile, done) => {
            await this.verifyFb(accessToken, refreshToken, profile, done);
        });
        passport.use(this);
    }

    async verifyFb(accessToken, refreshToken, profile, done) {
        console.log(`[fb.strategy->verifyFb():: accessToken: ${accessToken}, profile: ${JSON.stringify(profile)}`);
        try {
            const isValid = await this.auth.validateOrCreateFbUser(profile, accessToken);
            if(!isValid) {
                return done('Unauthorized', null);
            } 
            return done(null, profile);
        } catch (error) {
            console.log(`[fb.strategy->verifyFb() Catch block]:: error ${JSON.stringify(error)}`);  
            return null;          
        }
    }

    async validate(token: any, done: Function) {
        const user = await this.auth.validateUser(token);
        if(!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}