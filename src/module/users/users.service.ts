import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from './types/User';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'Ace',
      password: 'portgas',
    },
    {
      username: 'Luffy',
      password: 'monkey',
    },
    {
      username: 'Sanji',
      password: 'Vinsmoke',
    },
    {
      username: 'Zoro',
      password: 'Roronoa',
    },
  ];

  getUsers(): User[] {
    return this.users.map((user) => plainToClass(UserEntity, user));
  }

  getUserByName(name: string): User {
    return this.users.find((user) =>
      plainToClass(UserEntity, user.username === name),
    );
  }

  getUserById(username: string): User {
    return this.users.find((where) => where.username === username);
  }
}
