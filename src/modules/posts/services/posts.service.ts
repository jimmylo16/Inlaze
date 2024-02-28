import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { UpdatePostDto } from '../dto/update-post.dto';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    await this.postRepository.save(post);

    return post;
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const posts = await this.postRepository.find({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
    });

    return posts;
  }

  findOne(id: string) {
    const post = this.postRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['id', 'content', 'likes', 'title', 'user', 'createdAt'],
    });
    if (!post) {
      throw new NotFoundException(`post with id ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatepostDto: UpdatePostDto) {
    await this.findOne(id);

    const updatedpost = await this.postRepository.update(id, updatepostDto);
    return updatedpost;
  }

  async remove(id: string) {
    const deletedpost = await this.update(id, { deletedAt: new Date() });

    return deletedpost;
  }
}
