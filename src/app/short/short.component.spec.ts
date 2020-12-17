import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortComponent } from './short.component';

describe('ShortComponent', () => {
  let component: ShortComponent;
  let fixture: ComponentFixture<ShortComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
