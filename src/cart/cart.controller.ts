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
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gurd';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust path

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('load-all')
  async getUserCart(@Query('userId') userId: number) {
    return this.cartService.getAllItems(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-cart')
  async saveCart(@Body() createCartDto: any) {
    return this.cartService.addToCart(createCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateQuantity(@Param('id') id: number, @Body() payloaod: any) {
    return this.cartService.updateQuantity(id, payloaod);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async removeItem(@Param('id') id: number) {
    return this.cartService.removeItem(id);
  }
}
