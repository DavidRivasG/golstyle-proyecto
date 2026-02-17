import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPageComponent } from './catalogo-page.component';

describe('CatalogoPageComponent', () => {
  let component: CatalogoPageComponent;
  let fixture: ComponentFixture<CatalogoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products by club', () => {
    component.toggleClub('Real Madrid');
    expect(component.productosFiltrados.every(p => p.club === 'Real Madrid')).toBeTruthy();
  });

  it('should filter products by temporada', () => {
    component.toggleTemporada('Actual');
    expect(component.productosFiltrados.every(p => p.temporada === 'actual')).toBeTruthy();
  });

  it('should toggle filter section', () => {
    const initialState = component.filtrosExpandidos.clubes;
    component.toggleFiltro('clubes');
    expect(component.filtrosExpandidos.clubes).toBe(!initialState);
  });
});
