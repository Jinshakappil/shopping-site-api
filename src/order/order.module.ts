import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { razorpayProvider } from './razorpay.provider';
import { CartModule } from 'src/cart/cart.modue';

@Module({
  providers: [OrderService,razorpayProvider],
  controllers: [OrderController],
  imports: [CartModule,TypeOrmModule.forFeature([Order])], // <-- THIS LINE IS IMPORTANT
})
export class OrderModule {}
