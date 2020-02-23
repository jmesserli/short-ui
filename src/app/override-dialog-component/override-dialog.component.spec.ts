import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideDialogComponent } from './override-dialog.component';

describe('OverrideDialogComponentComponent', () => {
  let component: OverrideDialogComponent;
  let fixture: ComponentFixture<OverrideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverrideDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
