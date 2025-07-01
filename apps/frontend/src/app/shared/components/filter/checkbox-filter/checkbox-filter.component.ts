/*!
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, input, InputSignal, OnInit, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckBoxFilterConfig } from './checkbox-filter-config';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrl: './checkbox-filter.component.scss',
})
export class CheckboxFilterComponent implements OnInit {
  selectedStates: FormControl<string[] | null> = new FormControl([]);
  resetEventEmitter: InputSignal<EventEmitter<string> | undefined> = input<EventEmitter<string>>();
  inputConfig = input<CheckBoxFilterConfig>(new CheckBoxFilterConfig('', ''));
  possibleStatesInput = input<string[]>([]);

  selectedStatesOutput = output<string[]>();

  ngOnInit(): void {
    this.selectedStates.valueChanges.subscribe((states: string[] | null) => {
      this.emitStates();
    });

    this.resetEventEmitter()?.subscribe((string) => {
      this.selectedStates.setValue([]);
    });
  }

  onCheckBoxChange(selectedState: string) {
    let states = this.selectedStates.value;
    if (states) {
      if (!states.includes(selectedState)) {
        states.push(selectedState);
        this.selectedStates.setValue(states);
      } else if (states) {
        states = states.filter((state: string) => state !== selectedState);
        this.selectedStates.setValue(states);
      }
    }
    this.emitStates();
  }

  isCheckBoxChecked(value: string): boolean {
    return this.selectedStates.value ? this.selectedStates.value.includes(value) : false;
  }

  emitStates() {
    this.selectedStatesOutput.emit(this.selectedStates.value ?? []);
  }
}
