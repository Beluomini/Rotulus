import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { UserDTO } from 'src/modules/user/user.dto';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  login(user: UserDTO) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    const currentUser: UserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      passwordRec: user.passwordRec,
      status: user.status,
    };

    if (user) {
      const isPasswordValid = await argon2.verify(user.password, password);

      if (isPasswordValid) {
        if (user.status === 'inactive') {
          this.userService.update(
            user.id,
            {
              name: user.name,
              email: user.email,
              password: user.password,
              passwordRec: user.passwordRec,
              status: 'active',
            },
            currentUser
          );
        }

        return user;
      }
    }

    throw new Error('Usuário ou senha inválidos');
  }
}
