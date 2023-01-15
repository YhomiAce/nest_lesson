import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './module/products/products.module';
import { OrdersModule } from './module/orders/orders.module';
import { ProjectsModule } from './module/projects/projects.module';
@Module({
  imports: [CustomersModule, ProductsModule, OrdersModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
