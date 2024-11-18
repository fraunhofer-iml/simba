import { CompaniesSeed } from '../../../../seed/companies.seed';

export const GET_COMPANY_BY_ID_QUERY_MOCK = {
  where: { id: CompaniesSeed[0].id },
  include: {
    paymentInformation: true,
  },
};
