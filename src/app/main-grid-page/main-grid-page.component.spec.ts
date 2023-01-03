import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGridPageComponent } from './main-grid-page.component';

describe('MainGridPageComponent', () => {
  let component: MainGridPageComponent;
  let fixture: ComponentFixture<MainGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGridPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
