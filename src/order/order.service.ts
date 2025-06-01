import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
// import * as Razorpay from 'razorpay';
import Razorpay from 'razorpay';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject('RAZORPAY_CLIENT') private readonly razorpayClient: Razorpay,
    private cartService: CartService,
  ) {}
  // orders.service.ts
  async placeOrder(payload: any) {
    const formBody = {
      userId: payload.userId,
      productId: payload.productId,
      created_at: new Date(),
      shippingAddress: payload.shippingAddress,
    };
    // Save the order and clear the user's cart (you can customize this)
    const order = await this.orderRepository.save({ ...formBody });

    let record = {
      userId: payload.userId,
      productId: payload.productId,
      orderId: order.id,
    };
    await this.cartService.orderPlaced(record);

    //   await this.cartRepository.delete({ userId }); // Clear cart after ordering

    return { message: 'Order placed successfully', order, success: true };
  }

  async createOrder(body: any, currency: string = 'INR') {
    // const options: any = {
    //   amount: amount,
    //   currency,
    //   // receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    // };

    try {
      if (body.id) {
        let data = await this.orderRepository.findOne({
          where: { id: body.id },
        });
        data.paid = 'Y';
        const order: Order = await this.orderRepository.save(data);
        const cart: any = await this.cartService.findCartItem(body);
        // if (cart && order) {
        return { message: 'Payment  successfull', order, success: true };
        // }
      }
      // const order = await this.razorpayClient.orders.create(options);
      // return {
      //   id: order.id,
      //   currency: order.currency,
      //   amount: order.amount,
      //   receipt: order.receipt,
      //   status: order.status,
      // };
    } catch (err) {
      throw new Error(`Razorpay order creation failed: ${err.message}`);
    }
  }


}
