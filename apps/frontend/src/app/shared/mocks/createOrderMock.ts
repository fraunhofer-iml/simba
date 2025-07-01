import { CreateOrderDto } from '@ap3/api';

export const createOrderMock: CreateOrderDto = {
  productId: 'Quadrocopter',
  amount: 2,
  year: 2025,
  calendarWeek: 23,
  customerId: '002',
  unitOfMeasureCode: 'Piece',
} as CreateOrderDto
