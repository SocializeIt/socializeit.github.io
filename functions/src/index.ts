import * as functions from 'firebase-functions';
import * as express from 'express';
import * as passport from 'passport';
import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { INestApplication } from '@nestjs/common';

const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const server: express.Express = express();

const startNestApp = async (expressInstance: express.Express) => {
    const app: Promise<INestApplication> = NestFactory.create(AppModule, expressInstance);
    app.then(instance => {
        instance.use(cors());
        passport.use(new FacebookStrategy({
            clientID: '636207509774692',
            clientSecret: 'c3048a2745b2973133478e0a8f3f99bc',
            callbackURL: 'http://localhost:5001/socialize-it/us-central1/api/auth/callback',
            redirectURL: 'http://localhost:5001/socialize-it/us-central1/api/auth/callback'            
        })); //, (t, u, i) => { console.log(t,u,i);}));
        // passport.use(new TwitterStrategy({

        // }));
        console.log('pasport', JSON.stringify(passport));
        instance.use(passport.initialize({ userProperty: 'user'}));
        instance.init().then(v => v.getHttpServer()).catch(e => console.log(e));
    }).catch(e => console.log(e));
};

startNestApp(server);

server.route('/auth/facebook/oauth')
    .get(passport.authenticate('facebook', function(err, user, info) {
        console.log(err);
        console.log(user);
        console.log(info);
    }));

export const api = functions.https.onRequest(server);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
