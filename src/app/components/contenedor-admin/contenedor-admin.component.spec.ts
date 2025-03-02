import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAdminComponent } from './contenedor-admin.component';

describe('ContenedorAdminComponent', () => {
  let component: ContenedorAdminComponent;
  let fixture: ComponentFixture<ContenedorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
