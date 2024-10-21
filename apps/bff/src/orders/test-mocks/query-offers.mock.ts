export const queryOffersToShowWithOrder = {
  where: {
    orderId: {
      equals: String('cm2agsjs500009tf1hc9f5guo'),
    },
    status: {
      in: ['Open', 'Accepted'],
    }
  },
  include: {
    order: true,
  }
};

export const queryOpenOffersByOrderId = {
  where: {
    orderId: {
      equals: String('cm2agsjs500009tf1hc9f5guo'),
    },
    status: {
      in: ['Open'],
    }
  },
  include: {
    order: true,
  }
};

export const queryUniqueOrThrow = {
  where: { id: 'cm2agsjsk00019tf1urzymlqu' }
}
