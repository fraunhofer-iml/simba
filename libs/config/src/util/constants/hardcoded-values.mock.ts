import { CompaniesSeed } from '@ap3/database';

export const HARDCODEDBACKENDVALUES = {
  debtorId: CompaniesSeed[0].id, //TODO : Company Id needs to be accessed by processing JWT
  creditorId: CompaniesSeed[1].id,
};
