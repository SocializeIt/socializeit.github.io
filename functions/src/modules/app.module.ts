import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';

@Module({
    controllers: [ AuthController],
    exports: [AuthController]
})
export class AppModule { }