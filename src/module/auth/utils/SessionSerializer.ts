import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/module/users/users.service';
import { User } from 'src/typeorm';

export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }
  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('Serialize User');

    done(null, user);
  }
  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('DeSerialize User');
    const userDB = await this.userService.findAUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
