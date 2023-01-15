import { Exclude } from 'class-transformer';

export class UserEntity {
  username: string;
  @Exclude()
  password: string;
  id: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
