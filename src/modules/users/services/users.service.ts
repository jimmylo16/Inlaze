import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const users = await this.userRepository.find({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
    });

    return users;
  }

  findOne(id: string) {
    const user = this.userRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['id', 'email', 'fullName', 'refreshToken', 'age', 'createdAt'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.update(id, { deletedAt: new Date() });

    return deletedUser;
  }
}
