import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from '../user/user.entity';
// import { Product } from '../product/product.entity';
// import { User } from 'src/users/users.entity';
// import { Item } from 'src/items/item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User)
  @Column()
  userId: String;

  // @ManyToOne(() => Item)
  @Column()
  productId: String;

  @Column()
  quantity: number;
  @Column()
  price: number;
}
