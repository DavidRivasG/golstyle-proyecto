import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoViewComponent } from './detalle-pedido-view.component';

describe('DetallePedidoViewComponent', () => {
  let component: DetallePedidoViewComponent;
  let fixture: ComponentFixture<DetallePedidoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePedidoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePedidoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
