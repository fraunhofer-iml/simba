import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule } from '@angular/material/icon';
import {MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      changeStatus: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      schemas:[NO_ERRORS_SCHEMA],
      imports:[
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterOutlet,
      ],
      declarations: [SidebarComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.changeStatus and navigate to /login on logout', () => {
    component.logout();
    expect(authService.changeStatus).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
