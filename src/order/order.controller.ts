import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gurd';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

@UseGuards(JwtAuthGuard)
@Post('place-order')
async placeOrder(@Body() body:any) {
    //body.userId, body.items
  return this.orderService.placeOrder(body);
}

@UseGuards(JwtAuthGuard)
@Post('create-order')
  async createOrder(@Body() body) {
    return this.orderService.createOrder(body);
  }
}
