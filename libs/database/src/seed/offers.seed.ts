import { Prisma } from '@prisma/client'; 
 export const OffersSeed = [
  {
    id: 'of001',
    creationDate: new Date("2024-10-02T00:00:00.000Z"),
    decisionDate: new Date("2024-10-08T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(41),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(3),
    status: 'accepted',
    serviceProcessId: 'sp001'
  },
  {
    id: 'of002',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(14),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp001'
  },
  {
    id: 'of003',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp001'
  },
  {
    id: 'of004',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(16),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp001'
  },
  {
    id: 'of005',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(13),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp002'
  },
  {
    id: 'of006',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(14),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp002'
  },
  {
    id: 'of007',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp002'
  },
  {
    id: 'of008',
    creationDate: new Date("2024-10-12T00:00:00.000Z"),
    decisionDate: new Date("2024-10-18T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(42),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(21),
    status: 'accepted',
    serviceProcessId: 'sp002'
  },
  {
    id: 'of009',
    creationDate: new Date("2024-10-17T00:00:00.000Z"),
    decisionDate: new Date("2024-10-19T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(42),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(10),
    status: 'accepted',
    serviceProcessId: 'sp003'
  },
  {
    id: 'of010',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(18),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp003'
  },
  {
    id: 'of011',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(19),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp003'
  },
  {
    id: 'of012',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(20),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp003'
  },
  {
    id: 'of013',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(21),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp004'
  },
  {
    id: 'of014',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp004'
  },
  {
    id: 'of015',
    creationDate: new Date("2024-10-20T00:00:00.000Z"),
    decisionDate: new Date("2024-11-21T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(42),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(20),
    status: 'accepted',
    serviceProcessId: 'sp004'
  },
  {
    id: 'of016',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(24),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp004'
  },
  {
    id: 'of017',
    creationDate: new Date("2024-11-02T00:00:00.000Z"),
    decisionDate: new Date("2024-11-05T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(44),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(18),
    status: 'accepted',
    serviceProcessId: 'sp005'
  },
  {
    id: 'of018',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(26),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp005'
  },
  {
    id: 'of019',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(27),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp005'
  },
  {
    id: 'of020',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(28),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp005'
  },
  {
    id: 'of021',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp006'
  },
  {
    id: 'of022',
    creationDate: new Date("2024-11-02T00:00:00.000Z"),
    decisionDate: new Date("2024-11-05T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(45),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(60),
    status: 'accepted',
    serviceProcessId: 'sp006'
  },
  {
    id: 'of023',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp006'
  },
  {
    id: 'of024',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp006'
  },
  {
    id: 'of025',
    creationDate: new Date("2024-11-07T00:00:00.000Z"),
    decisionDate: new Date("2024-11-09T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(46),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(10),
    status: 'accepted',
    serviceProcessId: 'sp007'
  },
  {
    id: 'of026',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp007'
  },
  {
    id: 'of027',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp007'
  },
  {
    id: 'of028',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp007'
  },
  {
    id: 'of029',
    creationDate: new Date("2024-11-17T00:00:00.000Z"),
    decisionDate: new Date("2024-11-18T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(47),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(20),
    status: 'accepted',
    serviceProcessId: 'sp008'
  },
  {
    id: 'of030',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp008'
  },
  {
    id: 'of031',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp008'
  },
  {
    id: 'of032',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp008'
  },
  {
    id: 'of033',
    creationDate: new Date("2024-11-17T00:00:00.000Z"),
    decisionDate: new Date("2024-11-18T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(47),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(30),
    status: 'accepted',
    serviceProcessId: 'sp009'
  },
  {
    id: 'of034',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp009'
  },
  {
    id: 'of035',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp009'
  },
  {
    id: 'of036',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp009'
  },
  {
    id: 'of037',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp010'
  },
  {
    id: 'of038',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp010'
  },
  {
    id: 'of039',
    creationDate: new Date("2024-11-21T00:00:00.000Z"),
    decisionDate: new Date("2024-11-23T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(47),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(28),
    status: 'accepted',
    serviceProcessId: 'sp010'
  },
  {
    id: 'of040',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp010'
  },
  {
    id: 'of041',
    creationDate: new Date("2024-11-28T00:00:00.000Z"),
    decisionDate: new Date("2024-11-29T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(48),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(12),
    status: 'accepted',
    serviceProcessId: 'sp011'
  },
  {
    id: 'of042',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp011'
  },
  {
    id: 'of043',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp011'
  },
  {
    id: 'of044',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp011'
  },
  {
    id: 'of045',
    creationDate: new Date("2024-12-03T00:00:00.000Z"),
    decisionDate: new Date("2024-12-05T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(49),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(3),
    status: 'accepted',
    serviceProcessId: 'sp012'
  },
  {
    id: 'of046',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp012'
  },
  {
    id: 'of047',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp012'
  },
  {
    id: 'of048',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp012'
  },
  {
    id: 'of049',
    creationDate: new Date("2024-12-14T00:00:00.000Z"),
    decisionDate: new Date("2024-12-16T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(50),
    plannedYear: new Prisma.Decimal(2024),
    price: new Prisma.Decimal(3),
    status: 'accepted',
    serviceProcessId: 'sp013'
  },
  {
    id: 'of050',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp013'
  },
  {
    id: 'of051',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp013'
  },
  {
    id: 'of052',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp013'
  },
  {
    id: 'of053',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp014'
  },
  {
    id: 'of054',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp014'
  },
  {
    id: 'of055',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp014'
  },
  {
    id: 'of056',
    creationDate: new Date("2025-01-04T00:00:00.000Z"),
    decisionDate: new Date("2025-01-10T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(1),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(40),
    status: 'accepted',
    serviceProcessId: 'sp014'
  },
  {
    id: 'of057',
    creationDate: new Date("2025-01-14T00:00:00.000Z"),
    decisionDate: new Date("2025-01-15T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(3),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(54),
    status: 'accepted',
    serviceProcessId: 'sp015'
  },
  {
    id: 'of058',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp015'
  },
  {
    id: 'of059',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp015'
  },
  {
    id: 'of060',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp015'
  },
  {
    id: 'of061',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp016'
  },
  {
    id: 'of062',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp016'
  },
  {
    id: 'of063',
    creationDate: new Date("2025-01-14T00:00:00.000Z"),
    decisionDate: new Date("2025-01-15T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(3),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(80),
    status: 'accepted',
    serviceProcessId: 'sp016'
  },
  {
    id: 'of064',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp016'
  },
  {
    id: 'of065',
    creationDate: new Date("2025-01-19T00:00:00.000Z"),
    decisionDate: new Date("2025-01-22T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(4),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(36),
    status: 'accepted',
    serviceProcessId: 'sp017'
  },
  {
    id: 'of066',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp017'
  },
  {
    id: 'of067',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp017'
  },
  {
    id: 'of068',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp017'
  },
  {
    id: 'of069',
    creationDate: new Date("2025-01-21T00:00:00.000Z"),
    decisionDate: new Date("2025-01-23T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(5),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(9),
    status: 'accepted',
    serviceProcessId: 'sp018'
  },
  {
    id: 'of070',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp018'
  },
  {
    id: 'of071',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp018'
  },
  {
    id: 'of072',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp018'
  },
  {
    id: 'of073',
    creationDate: new Date("2025-01-25T00:00:00.000Z"),
    decisionDate: new Date("2025-01-26T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(6),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(28),
    status: 'accepted',
    serviceProcessId: 'sp019'
  },
  {
    id: 'of074',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp019'
  },
  {
    id: 'of075',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp019'
  },
  {
    id: 'of076',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp019'
  },
  {
    id: 'of077',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp020'
  },
  {
    id: 'of078',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp020'
  },
  {
    id: 'of079',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp020'
  },
  {
    id: 'of080',
    creationDate: new Date("2025-02-01T00:00:00.000Z"),
    decisionDate: new Date("2025-02-02T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(6),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(48),
    status: 'accepted',
    serviceProcessId: 'sp020'
  },
  {
    id: 'of081',
    creationDate: new Date("2025-02-01T00:00:00.000Z"),
    decisionDate: new Date("2025-02-03T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(6),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(24),
    status: 'accepted',
    serviceProcessId: 'sp021'
  },
  {
    id: 'of082',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp021'
  },
  {
    id: 'of083',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp021'
  },
  {
    id: 'of084',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp021'
  },
  {
    id: 'of085',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp022'
  },
  {
    id: 'of086',
    creationDate: new Date("2025-02-05T00:00:00.000Z"),
    decisionDate: new Date("2025-02-07T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(7),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(1),
    status: 'accepted',
    serviceProcessId: 'sp022'
  },
  {
    id: 'of087',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp022'
  },
  {
    id: 'of088',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp022'
  },
  {
    id: 'of089',
    creationDate: new Date("2025-02-05T00:00:00.000Z"),
    decisionDate: new Date("2025-02-07T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(7),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(50),
    status: 'accepted',
    serviceProcessId: 'sp023'
  },
  {
    id: 'of090',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp023'
  },
  {
    id: 'of091',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp023'
  },
  {
    id: 'of092',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp023'
  },
  {
    id: 'of093',
    creationDate: new Date("2025-02-14T00:00:00.000Z"),
    decisionDate: new Date("2025-02-15T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(8),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(36),
    status: 'accepted',
    serviceProcessId: 'sp024'
  },
  {
    id: 'of094',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp024'
  },
  {
    id: 'of095',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp024'
  },
  {
    id: 'of096',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp024'
  },
  {
    id: 'of097',
    creationDate: new Date("2025-03-02T00:00:00.000Z"),
    decisionDate: new Date("2025-03-03T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(10),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(9),
    status: 'accepted',
    serviceProcessId: 'sp025'
  },
  {
    id: 'of098',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp025'
  },
  {
    id: 'of099',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp025'
  },
  {
    id: 'of100',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp025'
  },
  {
    id: 'of101',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp026'
  },
  {
    id: 'of102',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp026'
  },
  {
    id: 'of103',
    creationDate: new Date("2025-03-02T00:00:00.000Z"),
    decisionDate: new Date("2025-03-05T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(10),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(60),
    status: 'accepted',
    serviceProcessId: 'sp026'
  },
  {
    id: 'of104',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp026'
  },
  {
    id: 'of105',
    creationDate: new Date("2025-03-08T00:00:00.000Z"),
    decisionDate: new Date("2025-03-10T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(11),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(2),
    status: 'accepted',
    serviceProcessId: 'sp027'
  },
  {
    id: 'of106',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp027'
  },
  {
    id: 'of107',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp027'
  },
  {
    id: 'of108',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp027'
  },
  {
    id: 'of109',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp028'
  },
  {
    id: 'of110',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp028'
  },
  {
    id: 'of111',
    creationDate: new Date("2025-03-08T00:00:00.000Z"),
    decisionDate: new Date("2025-03-10T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(12),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'accepted',
    serviceProcessId: 'sp028'
  },
  {
    id: 'of112',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp028'
  },
  {
    id: 'of113',
    creationDate: new Date("2025-03-19T00:00:00.000Z"),
    decisionDate: new Date("2025-03-21T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(13),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(18),
    status: 'accepted',
    serviceProcessId: 'sp029'
  },
  {
    id: 'of114',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp029'
  },
  {
    id: 'of115',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp029'
  },
  {
    id: 'of116',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp029'
  },
  {
    id: 'of117',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp030'
  },
  {
    id: 'of118',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp030'
  },
  {
    id: 'of119',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp030'
  },
  {
    id: 'of120',
    creationDate: new Date("2025-03-28T00:00:00.000Z"),
    decisionDate: new Date("2025-03-29T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(14),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(40),
    status: 'accepted',
    serviceProcessId: 'sp030'
  },
  {
    id: 'of121',
    creationDate: new Date("2025-03-28T00:00:00.000Z"),
    decisionDate: new Date("2025-03-29T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(14),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(12),
    status: 'accepted',
    serviceProcessId: 'sp031'
  },
  {
    id: 'of122',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp031'
  },
  {
    id: 'of123',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp031'
  },
  {
    id: 'of124',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp031'
  },
  {
    id: 'of125',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp032'
  },
  {
    id: 'of126',
    creationDate: new Date("2025-04-01T00:00:00.000Z"),
    decisionDate: new Date("2025-04-03T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(12),
    status: 'accepted',
    serviceProcessId: 'sp032'
  },
  {
    id: 'of127',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp032'
  },
  {
    id: 'of128',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp032'
  },
  {
    id: 'of129',
    creationDate: new Date("2025-04-08T00:00:00.000Z"),
    decisionDate: new Date("2025-04-09T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(11),
    status: 'accepted',
    serviceProcessId: 'sp033'
  },
  {
    id: 'of130',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp033'
  },
  {
    id: 'of131',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp033'
  },
  {
    id: 'of132',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp033'
  },
  {
    id: 'of133',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp034'
  },
  {
    id: 'of134',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp034'
  },
  {
    id: 'of135',
    creationDate: new Date("2025-04-08T00:00:00.000Z"),
    decisionDate: new Date("2025-04-09T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(15),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(60),
    status: 'accepted',
    serviceProcessId: 'sp034'
  },
  {
    id: 'of136',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp034'
  },
  {
    id: 'of137',
    creationDate: new Date("2025-05-01T00:00:00.000Z"),
    decisionDate: new Date("2025-05-02T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(19),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(45),
    status: 'accepted',
    serviceProcessId: 'sp035'
  },
  {
    id: 'of138',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp035'
  },
  {
    id: 'of139',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp035'
  },
  {
    id: 'of140',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp035'
  },
  {
    id: 'of141',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp036'
  },
  {
    id: 'of142',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp036'
  },
  {
    id: 'of143',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp036'
  },
  {
    id: 'of144',
    creationDate: new Date("2025-05-06T00:00:00.000Z"),
    decisionDate: new Date("2025-05-08T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(20),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(28),
    status: 'accepted',
    serviceProcessId: 'sp036'
  },
  {
    id: 'of145',
    creationDate: new Date("2025-05-11T00:00:00.000Z"),
    decisionDate: new Date("2025-05-13T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(21),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(70),
    status: 'accepted',
    serviceProcessId: 'sp037'
  },
  {
    id: 'of146',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp037'
  },
  {
    id: 'of147',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp037'
  },
  {
    id: 'of148',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp037'
  },
  {
    id: 'of149',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(5),
    status: 'refused',
    serviceProcessId: 'sp038'
  },
  {
    id: 'of150',
    creationDate: new Date("2025-05-13T00:00:00.000Z"),
    decisionDate: new Date("2025-05-15T00:00:00.000Z"),
    plannedCalendarWeek: new Prisma.Decimal(21),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(90),
    status: 'accepted',
    serviceProcessId: 'sp038'
  },
  {
    id: 'of151',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp038'
  },
  {
    id: 'of152',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: null,
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp038'
  },
  {
    id: 'of153',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'accepted',
    serviceProcessId: 'sp039'
  },
  {
    id: 'of154',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(6),
    status: 'refused',
    serviceProcessId: 'sp039'
  },
  {
    id: 'of155',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(7),
    status: 'refused',
    serviceProcessId: 'sp039'
  },
  {
    id: 'of156',
    creationDate: new Date("2025-06-03T08:45:48.924Z"),
    decisionDate: new Date("2025-06-03T08:45:48.924Z"),
    plannedCalendarWeek: new Prisma.Decimal(22),
    plannedYear: new Prisma.Decimal(2025),
    price: new Prisma.Decimal(8),
    status: 'refused',
    serviceProcessId: 'sp039'
  }
]