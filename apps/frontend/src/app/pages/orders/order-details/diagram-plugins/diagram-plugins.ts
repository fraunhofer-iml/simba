import { Plugin } from 'chart.js';

export function centerTextPlugin(priceSum: number): Plugin {
  return <Plugin>{
    id: 'centerText',
    afterDraw(chart: any) {
      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      const text = priceSum.toFixed(2) + ' €';

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
