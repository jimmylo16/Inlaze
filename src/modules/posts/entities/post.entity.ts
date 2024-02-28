import { BaseEntity } from 'src/common/entities/base.entity';
import { PostModel } from '../models/post.model';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity implements PostModel {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty()
  @Column('text')
  readonly title: string;

  @ApiProperty()
  @Column('text')
  readonly content: string;

  @ApiProperty()
  @Column('text')
  readonly likes: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.posts)
  readonly user: User;
}
