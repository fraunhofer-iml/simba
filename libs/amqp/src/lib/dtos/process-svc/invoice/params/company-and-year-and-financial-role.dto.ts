export class TRParamsCompanyIdAndYearAndFinancialRole {
  companyId: string;
  year: number;
  financialRole: string;

  constructor(companyId: string, year: number, financialRole: string) {
    this.companyId = companyId;
    this.year = year;
    this.financialRole = financialRole;
  }
}
