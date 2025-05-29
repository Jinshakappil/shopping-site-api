// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { CreateCartDto } from './create-cart.dto';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
// import { User } from 'src/users/users.entity';
import { Item } from 'src/items/item.entity';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(Item)
    private Item: Repository<Item>,

    // @InjectRepository(User)
    // private userRepository: Repository<User>,
  ) {}
  async getAllItems(userId: any): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { userId: userId },
    });
  }

  //   async addToCart(dto:any): Promise<void> {
  //     const user :any= await this.userRepository.findOne({ where: { id: dto.userId } });
  //     const product = await this.productRepository.findOne({
  //       where: { id: dto.productId },
  //     });

  //     if (!user || !product) {
  //       throw new Error('User or product not found');
  //     }

  //     const existingCartItem = await this.cartRepository.findOne({
  //         where:{id:dto.id}

  //     //   where: { user: { id: dto.userId }, product: { id: dto.productId } },
  //     });

  //     if (existingCartItem) {
  //       existingCartItem.quantity += 1;
  //       await this.cartRepository.save(existingCartItem);
  //     } else {
  //       const cartItem = this.cartRepository.create({
  //         user,
  //         // product,
  //         quantity: 1,
  //       });
  //       await this.cartRepository.save(cartItem);
  //     }
  //   }

  async addToCart(dto: any): Promise<void> {
    try {
      let existingCartItem;
      let cart;
      existingCartItem = await this.cartRepository.findOne({
        where: { userId: dto.userId, productId: dto.productId },
      });
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        cart = await this.cartRepository.save(existingCartItem);
      } else {
        const cartItem = this.cartRepository.create({
          ...dto,
          // product,
          // quantity: dto,
        });
        cart = await this.cartRepository.save(cartItem);
      }
      return cart;
    } catch (er) {
      console.log('err', er);
      return er;
    }
  }

  async updateQuantity(id, payload: any): Promise<Cart> {
    try {
      const item = await this.cartRepository.findOne({ where: { id: id } });
            console.log('prrrrrr',  payload.productId);

      const product = await this.Item.findOne({
        where: { id: payload.productId },
      });

      item.quantity = Math.max(1, item.quantity + payload.delta);

      item.price = product.price * item.quantity;
      return this.cartRepository.save(item);
    } catch (err) {
      console.log('errrrrrrrrrrr', err);
      return err;
    }
  }

  async removeItem(id: number): Promise<{ message: string }> {
    const result = await this.cartRepository.delete(id);

    if (result.affected === 0) {
      // throw new NotFoundException('Cart item not found');
    }

    return { message: 'Cart item removed successfully' };
  }
}
