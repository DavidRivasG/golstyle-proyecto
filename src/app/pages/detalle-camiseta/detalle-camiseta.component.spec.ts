import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCamisetaComponent } from './detalle-camiseta.component';

describe('DetalleCamisetaComponent', () => {
  let component: DetalleCamisetaComponent;
  let fixture: ComponentFixture<DetalleCamisetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCamisetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleCamisetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
