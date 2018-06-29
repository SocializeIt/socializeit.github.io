import * as functions from 'firebase-functions';
import * as express from 'express';
import * as passport from 'passport';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';

const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const server: express.Express = express();

const log = (v) => {
    console.log(v);
}

const startNestApplication = async(app: express.Express) => {
    app.use(cors());
    passport.use(new FacebookStrategy({
        clientID: '636207509774692',
        clientSecret: 'c3048a2745b2973133478e0a8f3f99bc',
        callbackURL: 'http://localhost:5001/socialize-it/us-central1/api/auth/callback'
    }, (e, p, i) => {
        log(e);
        log(p);
        log(i);
    }));

    console.log('pasport', JSON.stringify(passport));
    app.use(passport.initialize({ userProperty: 'user'}));
    // server.init(); // .then(e => log(e)).catch(e => log(e));

app.route('/auth/facebook/oauth')
    .get(passport.authenticate('facebook', function(err, user, info) {
        console.log(err);
        console.log(user);
        console.log(info);
    }));    
}

startNestApplication(server).then(v => log(v)).catch(e => log(e));

export const api = functions.https.onRequest(server);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
