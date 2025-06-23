import { CompanyDto } from '@ap3/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../../constants/endpoints';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getAllAvailableCompanies() {
    return this.httpClient.get<CompanyDto[]>(`${BASE_URL}${ApiEndpoints.companies.getAllCompanies}`);
  }
}
