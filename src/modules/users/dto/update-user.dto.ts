import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/auth/dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {
  deletedAt?: Date;
}
