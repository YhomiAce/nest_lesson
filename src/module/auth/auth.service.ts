import { Injectable } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    console.log('Here at Userservice');

    const user = await this.userService.findUser(email);
    if (user) {
      const matched = comparePassword(password, user.password);
      if (matched) {
        console.log('User validation success');
        return user;
      }
      console.log('Passwords do not match');
    }
    console.log('User validation failed');
    return null;
  }
}
