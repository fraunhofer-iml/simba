import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { WalletComponent } from './wallet.component';
import {BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet } from '@angular/router';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[   
        MatGridListModule,
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatTableModule,
        MatSortModule, 
        MatPaginatorModule,
        MatIconModule,
        NoopAnimationsModule,
        RouterOutlet
      ],
      declarations: [WalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
