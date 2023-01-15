import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    console.log('Here at Userservice');

    const user = await this.userService.findUser(email);
    if (user && user.password === password) {
      console.log('User validation success');
      return user;
    }
    console.log('User validation failed');
    return null;
  }
}
