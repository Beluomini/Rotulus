import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

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
