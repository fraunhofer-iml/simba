import { of } from 'rxjs';

export const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        return '';
      },
    },
    queryParamMap: {
      get: (key: string) => {
        return '';
      },
    },
    data: {
      someData: 'value',
    },
  },
  params: of({ id: '' }),
  queryParams: of({ q: '' }),
};
