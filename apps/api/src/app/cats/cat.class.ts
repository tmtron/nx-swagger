import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from './role-enum';

export class Cat {
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
    required: true,
    isArray: true,
    enum: RoleEnum,
  })
  readonly roles?: RoleEnum[];
}
