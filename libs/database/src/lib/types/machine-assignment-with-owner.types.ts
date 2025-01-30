import { MachineAssignment } from '@prisma/client';

export type MachineAssignmentWithOwner = MachineAssignment & {
  serviceProcess: {
    orderId: string | null;
  };
  machine: {
    company: { id: string; name: string };
  };
};
