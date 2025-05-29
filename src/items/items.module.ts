import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
    imports: [TypeOrmModule.forFeature([Item])], // <-- THIS LINE IS IMPORTANT

})
export class ItemsModule {}
