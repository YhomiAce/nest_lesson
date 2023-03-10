import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { LocalStrategy } from './utils/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
