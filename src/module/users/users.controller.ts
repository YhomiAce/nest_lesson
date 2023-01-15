import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  //   This is not searilizing the response
  @Get('/user/:name')
  getUserByName(@Param('name') name: string) {
    console.log(name);
    return this.userService.getUserByName(name);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.userService.getUserById(username);
    if (user) return new UserEntity(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
}
