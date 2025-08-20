import { machineAssignmentSeed, serviceProcessesSeed, serviceStatesSeed } from '@ap3/database';
import { MetadataDto } from '../../metadata/metadata.dto';

export const MetadataMock: MetadataDto = new MetadataDto(
  serviceProcessesSeed[0],
  ['of001', 'of002'],
  [machineAssignmentSeed[0], machineAssignmentSeed[1]],
  ['IV001', 'IV002'],
  [serviceStatesSeed[0], serviceStatesSeed[1]]
);
