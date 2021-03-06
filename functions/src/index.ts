// import * as functions from 'firebase-functions';
// import * as express from 'express';
// import * as passport from 'passport';
// import * as cors from 'cors';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './modules/app.module';

// const FacebookStrategy = require('passport-facebook').Strategy;
// // const TwitterStrategy = require('passport-twitter').Strategy;
// const server = express();

// const log = (v) => {
//     console.log(v);
// }

// const startNestApplication = async (app) => {
//     const instance = await NestFactory.create(AppModule, app, {cors:true});

//     instance.use(cors());
//     passport.use(new FacebookStrategy({
//         clientID: '636207509774692',
//         clientSecret: 'c3048a2745b2973133478e0a8f3f99bc',
//         callbackURL: 'http://localhost:5001/socialize-it/us-central1/api/auth/callback'
//     }, (e, p, i) => {
//         log(e);
//         log(p);
//         log(i);
//     }));

//     instance.use(passport.initialize({ userProperty: 'user'}));
//     await instance.init();
//         // .then()
//         // .catch(e => log(e));

//     app.route('/auth/facebook/oauth')
//         .get(passport.authenticate('facebook', function(err, user, info) {
//             log(err);
//             log(user);
//             log(info);
//         }));    
//     // return instance;
// }

// startNestApplication(server).then().catch(e => log(e));

// export const api = functions.https.onRequest(server);

import * as functions from 'firebase-functions';
import * as express from 'express';
import { Express } from 'express';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

const server: Express = express();

const startNestApplication = async (expressInstance: Express) => {
  const app = await NestFactory.create(AppModule, expressInstance);
  app.init();
}

startNestApplication(server);
export const api = functions.https.onRequest(server);
// async function bootstrap() {
//     const server = express();
//     const app = await NestFactory.create(AppModule, server);
    
//     return await app.init();
//   }

// bootstrap();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
