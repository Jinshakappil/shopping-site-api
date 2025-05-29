// src/cart/cart.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust path


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('load-all')
  async getUserCart(@Query('userId') userId: number) {
    return this.cartService.getAllItems(userId);
  }

  @Post('create-cart')
  async saveCart(@Body() createCartDto: any) {
    return this.cartService.addToCart(createCartDto);
  }

  @Patch('update/:id')
  async updateQuantity(@Param('id') id: number, @Body() payloaod: any) {
    return this.cartService.updateQuantity(id, payloaod);
  }
  @Delete('delete/:id')
  async removeItem(@Param('id') id: number) {
    return this.cartService.removeItem(id);
  }
}
