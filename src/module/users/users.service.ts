import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserModel } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './types/User';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'Ace',
      password: 'portgas',
      id: 1,
    },
    {
      username: 'Luffy',
      password: 'monkey',
      id: 2,
    },
    {
      username: 'Sanji',
      password: 'Vinsmoke',
      id: 3,
    },
    {
      username: 'Zoro',
      password: 'Roronoa',
      id: 4,
    },
  ];

  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getUsers() {
    // return this.users.map((user) => plainToClass(UserEntity, user));
    const user = await this.userRepository.find();
    return user;
  }

  getUserByName(name: string): User {
    return this.users.find((user) =>
      plainToClass(UserEntity, user.username === name),
    );
  }

  getUserById(username: string): User {
    return this.users.find((where) => where.username === username);
  }

  findUserById(id: number): User {
    return this.users.find((where) => where.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
    });
    return this.userRepository.save(newUser);
  }
}
