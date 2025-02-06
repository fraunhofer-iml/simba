import { UserRoles } from '@ap3/util';

export enum AuthRolesEnum {
  ADMIN = `realm:${UserRoles.ADMIN}`,
  CUSTOMER = `realm:${UserRoles.CUSTOMER}`,
  CONTRIBUTOR = `realm:${UserRoles.CONTRIBUTOR}`,
}
