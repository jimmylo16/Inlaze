import { BaseModel } from 'src/common/models/base.model';

export class UserModel extends BaseModel {
  readonly userId: string;
  readonly fullName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
}
