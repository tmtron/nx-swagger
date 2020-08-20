
export enum RoleEnum {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}


export class CreateCatDto {
  /**
   * using an enum array causes this exception:
   *
   *   Error: A circular dependency has been detected (property key: "roles").
   *   Please, make sure that each side of a bidirectional relationships are using lazy resolvers ("type: () => ClassType").
   */
  readonly roles: RoleEnum[];
}
