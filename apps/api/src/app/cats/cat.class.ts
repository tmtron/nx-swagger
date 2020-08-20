import { ApiProperty } from '@nestjs/swagger';
import {RoleEnum} from "./create-cat.dto";

export class Cat {
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
    required: true,
    type: () => [RoleEnum]
  })
  readonly roles: RoleEnum[];
}
