import { Component, EventEmitter, input, InputSignal, OnInit, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRangeFilterConfig } from './date-range-filter-config';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
})
export class DateRangeFilterComponent implements OnInit {
  dueDateFrom: FormControl<Date | null> = new FormControl(null);
  dueDateTo: FormControl<Date | null> = new FormControl(null);

  resetEventEmitter: InputSignal<EventEmitter<string> | undefined> = input<EventEmitter<string>>();

  inputConfig = input<DateRangeFilterConfig>(new DateRangeFilterConfig('', '', ''));

  dueDateFromOutput = output<Date | undefined>();
  dueDateToOutput = output<Date | undefined>();

  ngOnInit(): void {
    this.resetEventEmitter()?.subscribe((string) => {
      this.dueDateFrom.reset();
      this.dueDateTo.reset();
    });

    this.dueDateFrom.valueChanges.subscribe((date) => {
      if (date) {
        this.dueDateFromOutput.emit(date);
      } else {
        this.dueDateFromOutput.emit(undefined);
      }
    });
    this.dueDateTo.valueChanges.subscribe((date) => {
      if (date) {
        this.dueDateToOutput.emit(date);
      } else {
        this.dueDateToOutput.emit(undefined);
      }
    });
  }
}
