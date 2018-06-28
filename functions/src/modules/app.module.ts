import { Module } from '@nestjs/common';
import { FacebookFeedsController } from '../controllers/fb.controller';

@Module({
    controllers:[FacebookFeedsController]
})
export class AppModule {

}