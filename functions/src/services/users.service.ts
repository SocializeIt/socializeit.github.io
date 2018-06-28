import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-facebook-token';
import * as admin from 'firebase-admin';

@Injectable() 
export class UsersService {
    /**
     *
     */
    constructor() {        
    }
    findOneByEmail(email: any) {
        return admin.firestore().doc(`fbusers/${email}`).get().then(u => u.data());
    }

    async upsertFbUser(profile: Profile, accessToken: string) {
        let existingUser = await this.findOneByEmail(profile.id);
        try {
          if (!existingUser) {
            let savedUser = await this.saveUser({
              name: profile.displayName,
              email: profile.emails[0].value || null,
              avatarUrl: profile.photos[0].value || null,
              fb_id: profile.id,
              fb_token: accessToken
            });
            if (savedUser) {
              return savedUser;
            } else {
              return null;
            }
          }
          else {
            return existingUser;
          }
        } catch (e) {
          console.log('[user.svc->upsertFbUser()');
          console.dir(e);
          return null;
        }    
    }
    
    saveUser(user) {

    }
}