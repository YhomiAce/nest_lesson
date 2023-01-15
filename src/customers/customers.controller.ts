import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get('')
  getCustomer() {
    return {
      id: 1,
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      createdAt: new Date(),
    };
  }
}
