import { BaseModel } from 'src/common/models/base.model';
import { PostModel } from 'src/modules/posts/models/post.model';

export class UserModel extends BaseModel {
  readonly id: string;
  readonly fullName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly posts: PostModel[];
}
