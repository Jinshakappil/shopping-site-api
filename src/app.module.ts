import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ItemsModule } from './items/items.module';
import { CartModule } from './cart/cart.modue';
import { Cart } from './cart/cart.entity';
import { Item } from './items/item.entity';
import { Order } from './order/orders.entity';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myapp',
      entities: [User,Cart,Item,Order],
      // synchronize: true,// set false in production
    }),
     JwtModule.register({
      secret: 'your-secret-key', // Store securely in env
      signOptions: { expiresIn: '1h' },
    }),
     CartModule,
    UsersModule,
    ItemsModule,
    AuthModule,
    OrderModule    
    // other modules here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
