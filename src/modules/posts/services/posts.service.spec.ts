import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { createdPost, expectedPosts } from './mocks';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should create a post', async () => {
    const createPostDto: CreatePostDto = {
      title: 'test title',
      content: 'test content',
      userId: '1',
    };

    jest.spyOn(postRepository, 'create').mockReturnValue(createdPost);
    jest.spyOn(postRepository, 'save').mockResolvedValue(createdPost);

    const result = await service.create(createPostDto);

    expect(postRepository.create).toHaveBeenCalledWith({
      user: { id: createPostDto.userId },
      ...createPostDto,
    });
    expect(postRepository.save).toHaveBeenCalledWith(createdPost);
    expect(result).toEqual(createdPost);
  });

  it('should return all posts', async () => {
    const pagination = { limit: 10, offset: 0 };

    jest.spyOn(postRepository, 'find').mockResolvedValue(expectedPosts);

    const result = await service.findAll(pagination);

    expect(postRepository.find).toHaveBeenCalledWith({
      where: { deletedAt: null },
      take: pagination.limit,
      skip: pagination.offset,
    });
    expect(result).toEqual(expectedPosts);
  });

  it('should return a post by id', async () => {
    const postId = '1';

    jest.spyOn(postRepository, 'findOne').mockResolvedValue(createdPost);

    const result = await service.findOne(postId);

    expect(postRepository.findOne).toHaveBeenCalledWith({
      where: { id: postId, deletedAt: null },
      select: ['id', 'content', 'likes', 'title', 'user', 'createdAt'],
    });
    expect(result).toEqual(createdPost);
  });
});
