import { BaseEntity } from 'src/common/entities/base.entity';
import { UserModel } from '../models/user.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  readonly id: string;

  @Column('text')
  @ApiProperty()
  readonly fullName: string;

  @Column('int')
  @ApiProperty()
  readonly age: number;

  @Column('text', {
    unique: true,
  })
  @ApiProperty()
  readonly email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty()
  password: string;

  @Column('text', { nullable: true })
  readonly refreshToken?: string;

  @OneToMany(() => Post, (post) => post.user)
  @ApiProperty({ type: () => Post })
  readonly posts: Post[];
}
