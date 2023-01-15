import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  findCustomer = async () => {
    return {
      id: 1,
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      createdAt: new Date(),
    };
  };
}
