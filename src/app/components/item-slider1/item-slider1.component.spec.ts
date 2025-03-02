import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSlider1Component } from './item-slider1.component';

describe('ItemSlider1Component', () => {
  let component: ItemSlider1Component;
  let fixture: ComponentFixture<ItemSlider1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSlider1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSlider1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
