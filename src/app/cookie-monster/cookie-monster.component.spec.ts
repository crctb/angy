import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieMonsterComponent } from './cookie-monster.component';

describe('CookieMonsterComponent', () => {
  let component: CookieMonsterComponent;
  let fixture: ComponentFixture<CookieMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
