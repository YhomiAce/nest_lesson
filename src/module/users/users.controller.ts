import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  //   NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserNotFoundException } from './exceptions/UserNotFoundException.exception';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  async getUsers() {
    return await this.userService.getUsers();
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

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  @Get('/userId/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findUserById(id);
    if (user) return new UserEntity(user);
    throw new UserNotFoundException(
      'No User with this Id',
      HttpStatus.BAD_REQUEST,
    );
    // else throw new NotFoundException();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
