export enum RolesEnum {
  ADMIN = 'ap3_admin',
  CUSTOMER = 'ap3_customer',
  CONTRIBUTOR = 'ap3_contributor',
}

export enum AuthRolesEnum {
  ADMIN = `realm:${RolesEnum.ADMIN}`,
  CUSTOMER = `realm:${RolesEnum.CUSTOMER}`,
  CONTRIBUTOR = `realm:${RolesEnum.CONTRIBUTOR}`,
}
