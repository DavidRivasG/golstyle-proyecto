import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoExitoComponent } from './pedido-exito.component';

describe('PedidoExitoComponent', () => {
  let component: PedidoExitoComponent;
  let fixture: ComponentFixture<PedidoExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoExitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
