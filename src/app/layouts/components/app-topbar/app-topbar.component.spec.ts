import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTopbarComponent } from './app-topbar.component';

describe('AppTopbarComponent', () => {
  let component: AppTopbarComponent;
  let fixture: ComponentFixture<AppTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppTopbarComponent]
    });
    fixture = TestBed.createComponent(AppTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
