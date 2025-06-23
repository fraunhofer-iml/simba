import { MachineAssignmentSeed, ServiceProcessesSeed, ServiceStatesSeed } from '@ap3/database';
import { MetadataDto } from '../../metadata/metadata.dto';

export const MetadataMock: MetadataDto = new MetadataDto(
  ServiceProcessesSeed[0],
  ['of001', 'of002'],
  [MachineAssignmentSeed[0], MachineAssignmentSeed[1]],
  ['IV001', 'IV002'],
  [ServiceStatesSeed[0], ServiceStatesSeed[1]]
);
