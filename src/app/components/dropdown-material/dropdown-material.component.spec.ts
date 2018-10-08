import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMaterialComponent } from './dropdown-material.component';

describe('DropdownMaterialComponent', () => {
  let component: DropdownMaterialComponent;
  let fixture: ComponentFixture<DropdownMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
