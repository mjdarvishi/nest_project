import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }


  public async store(user: CreateUserDto) {
    var result = await this.usersRepository.save(user)
    return result;
  }

  public async findOne(id: number) {
    var result = await this.usersRepository.findOne({
      where: { id: id }
    })
    return result;
  }
  public async findAll(page:number,take:number) {
    var result = await this.usersRepository.findAndCount({
             take: take,
             skip: (page-1) * take 
    })
    return result;
  }
}
