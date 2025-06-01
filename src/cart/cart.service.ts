import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Cart } from './cart.entity';
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
      where: { userId: userId, paid: 'N' },
    });
  }
  /**
   * 
   * @param query 
   * @returns 
   */

  async OrderList(query: any): Promise<[]> {
    try {
      var cart = await this.cartRepository.find({
        where: {
          userId: query.userId,
          paid: 'Y',
        },
        relations: ['item'],
        // 'item' must match the relation name in your Cart entity
      });
     
      var formatted :any= cart.map((c) => ({
        id: c.id,
        userId: c.userId,
        quantity: c.quantity,
        paid: c.paid,
        productId: c.item?.id,
        itemName: c.item?.name,
        price: c.price,
        itemImage:c.item?.image,
      }));

      return formatted;
    } catch (err) {
      console.log('failed');
    }
  }
 

  /**
   * 
   * @param dto 
   * @returns 
   */
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
          paid: 'N',
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

      const product = await this.Item.findOne({
        where: { id: payload.productId },
      });

      item.quantity = Math.max(1, item.quantity + payload.delta);

      item.price = product.price * item.quantity;
      return this.cartRepository.save(item);
    } catch (err) {
      console.log('error', err);
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

  async findCartItem(params: any) {
    const existingCartItem = await this.cartRepository.findOne({
      where: { orderId: params.id },
    });
    existingCartItem.paid = 'Y';
    await this.cartRepository.save(existingCartItem);
  }

  async orderPlaced(params: any) {
    try {
      const existingCartItem = await this.cartRepository.findOne({
        where: { userId: params.userId, productId: params.productId },
      });
      existingCartItem.orderId = params.orderId;
      await this.cartRepository.save(existingCartItem);
    } catch (err) {
      console.log('errror', err);
    }
  }
}
