import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty({ example: 'Post title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Post content' })
  readonly content: string;

  @IsNumber()
  @IsOptional()
  readonly likes?: number;

  @IsString()
  @IsOptional()
  readonly userId: string;
}
