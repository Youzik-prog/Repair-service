import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpravkaComponent } from './spravka.component';

describe('SpravkaComponent', () => {
  let component: SpravkaComponent;
  let fixture: ComponentFixture<SpravkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpravkaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpravkaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
