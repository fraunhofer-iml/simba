import { TranslateModule } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog.component';

describe('DownloadInvoiceDialogComponent', () => {
  let component: DownloadInvoiceDialogComponent;
  let fixture: ComponentFixture<DownloadInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadInvoiceDialogComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()],

      providers: [InvoiceService, TranslateModule, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
