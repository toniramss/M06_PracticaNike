import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MisPedidosService } from './mis-pedidos.service';

describe('MisPedidosService', () => {
  let service: MisPedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MisPedidosService] 
    });
    service = TestBed.inject(MisPedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
