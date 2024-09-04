import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule } from '@angular/material/icon';
import {MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar.component';
import {BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet } from '@angular/router';
import { NoopAnimationDriver } from '@angular/animations/browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[    
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatButtonModule,
      NoopAnimationsModule,
      RouterOutlet],
      declarations: [SidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
