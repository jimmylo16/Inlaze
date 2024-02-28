import { BaseEntity } from 'src/common/entities/base.entity';
import { UserModel } from '../models/user.model';

export class User extends BaseEntity implements UserModel {
  userId: string;
  fullName: string;
  age: number;
  email: string;
  password: string;
}
