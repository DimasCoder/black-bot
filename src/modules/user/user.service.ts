import { ICrudService } from '@common/interfaces';
import { ID, Nullable } from '@common/types';
import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { User } from '@modules/user/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService
  implements ICrudService<User, CreateUserDto, UpdateUserDto>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: ID): Promise<Nullable<User>> {
    return this.userRepository.findOneBy({ chatId: id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: ID, updateUserDto: UpdateUserDto): Promise<Nullable<User>> {
    const existingUser = await this.findOne(id);

    if (!existingUser) {
      return null;
    }

    const user = this.userRepository.merge(existingUser, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: ID): Promise<void> {
    await this.userRepository.delete(id);
  }
}
