import { FormatService } from "../../../shared/services/util/format.service";
import { XAXisOption } from "echarts/types/dist/shared";
import { addDays, addHours, endOfWeek, setMilliseconds, setMinutes, setSeconds, startOfDay, startOfWeek } from "date-fns";
import { TIMEZONEFORMAT } from '../../../shared/formats/date-formats';

export class SchedulingChartAxisBuilder {
  static buildWeekXAxis(startDate: Date, formatService: FormatService): XAXisOption {
    const start = startOfWeek(startDate, { weekStartsOn: 1 });
    const end = endOfWeek(startDate, { weekStartsOn: 1 });
    return this.buildTimeAxis(start, end, false, false, 0, formatService);
  }

  static buildDayXAxis(startDate: Date): XAXisOption {
    const start = startOfDay(startDate);
    const end = addDays(start, 1);
    return this.buildTimeAxis(start, end, true, true, 1);
  }

  static buildHourXAxis(startDate: Date, formatService: FormatService): XAXisOption {
    const start = setMilliseconds(setSeconds(setMinutes(startDate, 0), 0), 0);
    const end = addHours(start, 4);
    return this.buildTimeAxis(start, end, true, true, 1, formatService);
  }

  private static buildTimeAxis(
    start: Date,
    end: Date,
    showLabels: boolean,
    hourFormatter: boolean,
    intervalHours: number,
    formatService?: FormatService
  ): XAXisOption {
    return {
      type: 'time',
      position: 'top',
      min: start.getTime(),
      max: end.getTime(),
      interval: intervalHours ? intervalHours * 60 * 60 * 1000 : undefined,
      axisLabel: {
        showMinLabel: showLabels,
        showMaxLabel: showLabels,
        formatter: (value: number) => {
          const date = new Date(value);
          if (hourFormatter) {
            const hour = date.getHours();
            return hour === 0 ? '0:00' : `${hour}:00`;
          }
          return formatService
            ? date.toLocaleDateString(formatService.getCurrentLocaleFormatter(), {
              day: '2-digit',
              month: '2-digit',
              timeZone: TIMEZONEFORMAT,
            })
            : date.toLocaleDateString();
        },
      },
    };
  }
}
