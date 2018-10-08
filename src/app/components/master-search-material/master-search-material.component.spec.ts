import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSearchMaterialComponent } from './master-search-material.component';

describe('MasterSearchMaterialComponent', () => {
  let component: MasterSearchMaterialComponent;
  let fixture: ComponentFixture<MasterSearchMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSearchMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSearchMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
