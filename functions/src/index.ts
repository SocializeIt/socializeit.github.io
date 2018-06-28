import * as functions from 'firebase-functions';
import * as express from 'express';
import { Express } from 'express';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

const server: Express = express();

const startNestApp = async (expressInstance: Express) => {
    const app = await NestFactory.create(AppModule, expressInstance);
    return app.init();
};

startNestApp(server);
export const api = functions.https.onRequest(server);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
