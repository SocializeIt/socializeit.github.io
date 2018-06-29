import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-facebook-token';
import * as admin from 'firebase-admin';
import { fbUserDto } from '../interfaces/fbuser.dto';

@Injectable() 
export class UsersService {
    /**
     *
     */
    constructor() {        
    }

    findOne(criteria: any) {
        return new fbUserDto();
    }

    findOneByEmail(email: any) {
        return admin.firestore().doc(`fbusers/${email}`).get();//.then(u => u.data());
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
    
    saveUser(user) { }
}