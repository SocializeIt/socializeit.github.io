import * as jwt from 'jsonwebtoken';
import { get } from 'config';
import { Profile } from 'passport-facebook-token';
import { fbUserDto } from '../interfaces/fbuser.dto';

import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createToken() {
    const user: JwtPayload = { email: 'user@email.com' };
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }

  async validateOrCreateFbUser(profile, accessToken): Promise<any> {
    return await this.usersService.findOneByEmail(profile.email);
  }  
}