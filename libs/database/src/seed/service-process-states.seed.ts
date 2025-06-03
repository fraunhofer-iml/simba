/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatus } from '@prisma/client';
import { ServiceStatesEnum } from '../../../util/src';

export const ServiceStatesSeed = <ServiceStatus[]>[
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-01T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-08T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-12T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-18T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-19T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-22T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-15T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-19T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-20T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-23T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-18T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-21T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-21T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-11-27T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-01T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-05T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-05T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp005',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-11-09T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-01T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-05T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-05T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp006',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-11-11T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-03T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-09T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp007',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-11-18T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-13T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-18T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp008',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-20T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-11T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-18T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-19T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp009',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-11-21T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-20T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-23T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-24T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp010',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-11-25T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-11-25T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-11-29T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-11-29T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp011',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-12-01T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-12-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-12-05T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-12-05T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp012',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-12-06T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-12-10T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-12-16T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-12-16T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp013',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-12-17T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-01-10T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-01-11T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp014',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-01-15T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-12T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-01-15T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-01-16T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp015',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-01-20T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-12T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-01-15T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-01-16T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp016',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-01-21T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-13T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-01-22T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-01-23T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp017',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-01-24T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-19T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-01-23T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-01-23T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp018',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-01-26T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-20T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-01-26T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-01-26T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp019',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-01-28T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-28T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-02-02T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-02-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp020',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-02-03T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-01-29T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-02-03T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-02-04T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp021',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-02-05T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-02-01T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-02-07T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-02-08T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp022',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-02-09T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-02-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-02-07T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-02-08T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp023',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-02-17T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-02-10T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-02-15T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-02-16T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp024',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-02-19T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-01T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-03T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-02-04T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp025',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-03-07T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-01T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-05T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-03-06T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp026',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-03-10T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-06T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-10T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-03-11T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp027',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-03-12T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-06T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-10T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-03-11T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp028',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-03-15T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-15T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-21T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-03-22T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp029',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-03-23T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-25T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-29T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-04-01T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp030',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-04-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-27T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-03-29T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-03-29T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp031',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-04-03T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-03-27T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-04-03T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-04-03T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp032',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-04-09T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-04-09T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-04-09T06:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-04-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp033',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-04-10T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-04-03T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-04-09T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-04-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp034',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-04-10T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-04-22T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-05-02T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-05-03T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp035',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-05-04T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-05-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-05-08T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-05-08T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp036',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-05-11T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-05-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-05-13T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-05-13T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp037',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-05-17T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2025-05-10T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2025-05-15T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2025-05-15T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp038',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2025-05-19T00:00:00Z'),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date(),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date(),
  },
  {
    serviceProcessId: 'sp039',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date(),
  },
];
