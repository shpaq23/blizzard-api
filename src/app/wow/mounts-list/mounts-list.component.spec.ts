import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountsListComponent } from './mounts-list.component';

describe('MountsListComponent', () => {
  let component: MountsListComponent;
  let fixture: ComponentFixture<MountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
