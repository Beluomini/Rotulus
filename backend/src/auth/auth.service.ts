import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
    validateUser(email: string, password: string) {
      throw new Error('Method not implemented.');
    }

}
