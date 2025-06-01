// src/orders/entities/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  shippingAddress: string;
  @Column()
  paid: string;

  @CreateDateColumn()
  created_at: Date;
}
