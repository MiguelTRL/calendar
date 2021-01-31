import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemiderComponent } from './remider.component';

describe('RemiderComponent', () => {
  let component: RemiderComponent;
  let fixture: ComponentFixture<RemiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
