import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigurationService } from '@ap3/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);
  private authHeader = '';
  constructor(private readonly config: ConfigurationService, private readonly httpService: HttpService) {}

  async refreshAuthHeaderFromKeycloak(): Promise<string> {
    await this.requestAccessToken().then(
      (value) => {
        this.authHeader = 'Bearer ' + value;
      },
      (reason) => {
        const text = `could not obtain JWT: ${JSON.stringify(reason)}`;
        this.logger.error(text);
        throw Error(text);
      }
    );
    return this.authHeader;
  }

  private async requestAccessToken(): Promise<string> {
    return await firstValueFrom(
      this.httpService
        .post(
          `${this.config.getKeycloakConfig().url}/realms/${this.config.getKeycloakConfig().realm}/protocol/openid-connect/token`,
          {
            grant_type: this.config.getKeycloakConfig().grantType,
            client_id: this.config.getKeycloakConfig().clientId,
            client_secret: this.config.getKeycloakConfig().secret,
            username: this.config.getKeycloakConfig().username,
            password: this.config.getKeycloakConfig().password,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .pipe(map((response) => response?.data['access_token']))
    );
  }
}
