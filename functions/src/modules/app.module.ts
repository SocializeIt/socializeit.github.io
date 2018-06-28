import { Module } from '@nestjs/common';
import { FacebookFeedsController } from '../controllers/fb.controller';
import { FacebookAuthController } from '../controllers/auth.controller';

@Module({
    controllers:[FacebookAuthController, FacebookFeedsController]
})
export class AppModule {

}