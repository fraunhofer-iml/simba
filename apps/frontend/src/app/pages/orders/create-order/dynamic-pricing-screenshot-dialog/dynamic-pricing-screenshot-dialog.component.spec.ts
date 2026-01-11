/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DynamicPricingScreenshotDialogComponent } from './dynamic-pricing-screenshot-dialog.component';
import { MatIconModule } from '@angular/material/icon';

describe('DynamicPricingScreenshotDialogComponent', () => {
  let component: DynamicPricingScreenshotDialogComponent;
  let fixture: ComponentFixture<DynamicPricingScreenshotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicPricingScreenshotDialogComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicPricingScreenshotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

