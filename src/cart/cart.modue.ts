// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Item } from 'src/items/item.entity';
// import { User } from 'src/users/users.entity';
// import { Item } from 'src/items/item.entity';

// @Module({
//   controllers: [CartController],
//   providers: [CartService],
//   imports: [TypeOrmModule.forFeature([Cart,User,Item])],
//   exports: [CartService],
// })
@Module({
//   imports: [TypeOrmModule.forFeature([Cart])],
  imports: [TypeOrmModule.forFeature([Cart,Item])],
  providers: [CartService],
  controllers: [CartController],
   exports: [CartService],
})
export class CartModule {}
