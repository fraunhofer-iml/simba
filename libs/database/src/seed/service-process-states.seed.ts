/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatesEnum } from '../../../util/src';
import { ServiceStatus } from '@prisma/client';

export const ServiceStatesSeed = <ServiceStatus[]>[
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
];
