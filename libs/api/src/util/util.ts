import { OfferAmqpDto } from '@ap3/amqp';
import { UserRoles } from '@ap3/util';
import { KeycloakUser } from '../auth';

export class APIUtil {
  public static getMockOfferPrices(offer: OfferAmqpDto): { basePrice: number; utilityPrice: number; fixedCosts: number } {
    const basePrice = parseFloat((offer.price * APIUtil.getRandomPercentage(40, 60)).toFixed(2));
    const utilityPrice = parseFloat((offer.price * APIUtil.getRandomPercentage(20, 40)).toFixed(2));
    const fixedCosts = parseFloat((offer.price - basePrice - utilityPrice).toFixed(2));
    return { basePrice: basePrice, utilityPrice: utilityPrice, fixedCosts: fixedCosts };
  }

  public static getRandomPercentage(min: number, max: number): number {
    const random = Math.random();
    const value = (min + random * (max - min)) / 100;
    return parseFloat(value.toFixed(2));
  }

  public static isAdminOrLoggedInCompany(user: KeycloakUser, companyId: string): boolean {
    return this.isAdmin(user) || companyId === user.company;
  }

  public static isAdmin(user: KeycloakUser): boolean {
    if (!user || !user.realm_access || !user.realm_access.roles) return false;
    return user.realm_access.roles.includes(UserRoles.ADMIN);
  }
}
