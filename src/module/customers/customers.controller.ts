import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/dtos/createCustomer.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('')
  getAllCustomers() {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  async getCustomerById(@Req() req: Request, @Res() res: Response) {
    // console.log(req.params.id);

    const customer = await this.customerService.findCustomerById(
      Number(req.params.id),
    );
    // console.log(customer);
    if (customer) {
      return res.status(200).send(customer);
    } else {
      res.status(404).send({
        message: 'Customer not found',
      });
    }
  }

  @Get('/search/:id')
  async searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  }

  @Post('/v2/create')
  //   @UsePipes(ValidationPipe) // it didn't work
  createCustomerV2(@Req() req: Request) {
    const data: CreateCustomerDto = req.body;
    this.customerService.addCustomer(data);
    return 'User created';
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customerService.addCustomer(createCustomerDto);
    return {
      success: true,
      message: 'User Created',
    };
  }
}
