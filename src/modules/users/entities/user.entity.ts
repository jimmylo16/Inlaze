import { BaseEntity } from 'src/common/entities/base.entity';
import { UserModel } from '../models/user.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';

@Entity('users')
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('text')
  readonly fullName: string;

  @Column('int')
  readonly age: number;

  @Column('text', {
    unique: true,
  })
  readonly email: string;

  @Column('text', {
    select: false,
  })
  readonly password: string;

  @OneToMany(() => Post, (post) => post.user)
  readonly posts: Post[];
}
