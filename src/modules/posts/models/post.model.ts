import { BaseModel } from 'src/common/models/base.model';
import { UserModel } from 'src/modules/users/models/user.model';

export class PostModel extends BaseModel {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly likes: number;
  readonly user: UserModel;
}
