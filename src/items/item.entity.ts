// src/items/item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 255, nullable: true })
  image?: string;
  carts: any;
}
