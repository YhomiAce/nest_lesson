import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dtos/createCustomer.dto';
import { Customer } from 'src/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Test One',
      email: 'test@gmail.com',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Test Two',
      email: 'test2@test.com',
      createdAt: new Date(),
    },
    {
      id: 4,
      name: 'Test Four',
      email: 'test3@test.com',
      createdAt: new Date(),
    },
  ];

  getCustomers = () => {
    return this.customers;
  };

  findCustomerById = async (id: number) => {
    const customer = this.customers.find((where) => where.id === id);
    console.log(customer);
    return customer;
  };

  addCustomer(createCustomerDto: CreateCustomerDto) {
    const customer = { ...createCustomerDto, createdAt: new Date() };
    this.customers.push(customer);
  }
}
