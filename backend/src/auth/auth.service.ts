import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/modules/user/user.dto';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}
    
    login(user: UserDTO) {
        
        const payload : UserPayload = {
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

      if (user){

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid){
          return user;
        }

      }

      throw new Error('Usuário ou senha inválidos');

    }

}
