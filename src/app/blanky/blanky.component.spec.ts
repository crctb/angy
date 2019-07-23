import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankyComponent } from './blanky.component';

describe('BlankyComponent', () => {
  let component: BlankyComponent;
  let fixture: ComponentFixture<BlankyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
