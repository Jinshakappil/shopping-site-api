import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  // Fetch all items from database
  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  // You can add more methods here later (e.g. findOne, create, update, delete)
}
