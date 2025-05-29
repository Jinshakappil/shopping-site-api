import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

  ) {}

 async create(payload: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create({
      ...payload,
      // password: hashedPassword,
    });

    return await this.usersRepository.save(newUser);
  }

  //   async findOne(payload: { email: string }): Promise<User | null> {
  //   return this.usersRepository.findOne({ where: {email: paylod.email } });
  // }
  async findOne(payload: {
    email: string;
    password: string;
  }): Promise<User |  { message: string,success: boolean }> {
    const data  = await this.usersRepository.findOne({
      where: { email: payload.email, password: payload.password },
    });
    if(data){
      return {...data,success:true}
    }else{
      return {message:'NOT FOUND',success:false}
    }
  }
}
