import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoProductoComponent } from './catalogo-producto.component';

describe('CatalogoProductoComponent', () => {
  let component: CatalogoProductoComponent;
  let fixture: ComponentFixture<CatalogoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    component.producto = {
      nombre: 'REAL MADRID 25/26',
      precio: 69,
      imagen: 'assets/images/madrid.png',
      club: 'Real Madrid',
      temporada: 'actual',
      liga: 'La Liga'
    };
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.nombre-producto').textContent).toContain('REAL MADRID 25/26');
    expect(compiled.querySelector('.precio-producto').textContent).toContain('69');
  });

  it('should display product image with correct src', () => {
    component.producto = {
      nombre: 'Test Product',
      precio: 99,
      imagen: 'assets/images/test.png',
      club: 'Test Club',
      temporada: 'actual',
      liga: 'Test Liga'
    };
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('assets/images/test.png');
  });
});
