import { Module } from '@nestjs/common';
import { CustomersModule } from './module/customers/customers.module';
import { ProductsModule } from './module/products/products.module';
import { OrdersModule } from './module/orders/orders.module';
import { ProjectsModule } from './module/projects/projects.module';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import entities from './typeorm';
@Module({
  imports: [
    CustomersModule,
    ProductsModule,
    OrdersModule,
    ProjectsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '6969',
      database: 'nest_lesson_db',
      entities: [...entities],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
