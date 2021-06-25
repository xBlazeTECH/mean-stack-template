import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdtComponent } from './mdt.component';

describe('MdtComponent', () => {
  let component: MdtComponent;
  let fixture: ComponentFixture<MdtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
