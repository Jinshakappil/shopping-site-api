// // src/cart/dto/create-cart.dto.ts
// import { IsEmail, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';

// class CartItemDto {
//   @IsNotEmpty()
//   id: number;

//   @IsNotEmpty()
//   name: string;

//   @IsNotEmpty()
//   price: number;

//   @IsNotEmpty()
//   quantity: number;
// }

// export class CreateCartDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   address: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CartItemDto)
//   items: CartItemDto[];
// }
