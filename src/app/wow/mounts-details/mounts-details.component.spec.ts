import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountsDetailsComponent } from './mounts-details.component';

describe('MountsDetailsComponent', () => {
  let component: MountsDetailsComponent;
  let fixture: ComponentFixture<MountsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
