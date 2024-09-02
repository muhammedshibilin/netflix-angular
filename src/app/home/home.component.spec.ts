import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomwComponent } from './home.component';

describe('HomwComponent', () => {
  let component: HomwComponent;
  let fixture: ComponentFixture<HomwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomwComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
