import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemProductoComponent } from './item-producto.component';

describe('ItemProductoComponent', () => {
  let component: ItemProductoComponent;
  let fixture: ComponentFixture<ItemProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProductoComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
