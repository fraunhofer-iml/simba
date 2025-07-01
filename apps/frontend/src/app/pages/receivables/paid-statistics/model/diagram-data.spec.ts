import { DiagramData } from './diagram-data';
import { paidStatisticsMock } from '../../../../shared/mocks/paidStatisticsMock';

describe('DiagramData', () => {

  it('should initialize percentages and totalValues correctly', () => {
    const diagramData = new DiagramData(paidStatisticsMock);

    expect(diagramData.getPercentages()).toEqual([0, 0]);
    expect(diagramData.getTotalValues()).toEqual([0, 0]);
  });
});
