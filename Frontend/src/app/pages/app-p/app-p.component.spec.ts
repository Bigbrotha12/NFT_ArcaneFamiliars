import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPComponent } from './app-p.component';

describe('AppPComponent', () => {
  let component: AppPComponent;
  let fixture: ComponentFixture<AppPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
