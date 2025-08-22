import { Plugin } from 'chart.js';
import { formatCurrency } from '@angular/common';
import { FormatService } from '../../../../shared/services/util/format.service';

export function centerTextPlugin(priceSum: number, formatService: FormatService): Plugin {
  return <Plugin>{
    id: 'centerText',
    afterDraw(chart: any) {
      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      const text = formatCurrency(priceSum, formatService.getCurrentLocaleFormatter(), '€', 'EUR', '1.2-2');

      ctx.save();
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, centerX, centerY);
      ctx.restore();
    },
  };
}
