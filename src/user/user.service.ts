import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string) {
    const user = this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async getUserById(id: string) {
    const user = this.userRepository.findOne({
      where: { id },
    });

    return user;
  }
}
