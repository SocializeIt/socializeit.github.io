import { Controller, Get } from '@nestjs/common';

@Controller('facebook-feeds')
export class FacebookFeedsController {
    @Get()
    findAll() {
        return [
            { user: {
                id: 1,
                username: 'user1'
            }}
        ];
    }
}