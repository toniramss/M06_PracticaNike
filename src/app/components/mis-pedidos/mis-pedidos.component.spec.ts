import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MisPedidosComponent } from './mis-pedidos.component';
import { MisPedidosService } from '../../services/mis-pedidos.service';

describe('MisPedidosComponent', () => {
  let component: MisPedidosComponent;
  let fixture: ComponentFixture<MisPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MisPedidosService, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
