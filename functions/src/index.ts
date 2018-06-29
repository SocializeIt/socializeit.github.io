import * as functions from 'firebase-functions';
import * as express from 'express';
import * as passport from 'passport';
import * as cors from 'cors';

const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const server: express.Express = express();

const log = (v) => {
    console.log(v);
}

    server.use(cors());
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
    server.use(passport.initialize({ userProperty: 'user'}));
    server.init(); // .then(e => log(e)).catch(e => log(e));

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
