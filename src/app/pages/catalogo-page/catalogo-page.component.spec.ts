import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoPageComponent } from './catalogo-page.component';
import { CamisetasService } from '../../services/camisetas.service';
import { of } from 'rxjs';

describe('CatalogoPageComponent', () => {
  let component: CatalogoPageComponent;
  let fixture: ComponentFixture<CatalogoPageComponent>;
  let mockService: jasmine.SpyObj<CamisetasService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('CamisetasService', ['getCatalogo']);
    mockService.getCatalogo.and.returnValue(of({ data: [] }));

    await TestBed.configureTestingModule({
      imports: [CatalogoPageComponent],
      providers: [
        { provide: CamisetasService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filter when aplicarFiltro is called', () => {
    component.aplicarFiltro('equipo', 'Real Madrid');
    expect(component.filtros.equipo).toBe('Real Madrid');
  });

  it('should clear filter when aplicarFiltro is called twice', () => {
    component.aplicarFiltro('liga', 'LaLiga');
    component.aplicarFiltro('liga', 'LaLiga');
    expect(component.filtros.liga).toBe('');
  });

  it('should call API when filters change', () => {
    component.aplicarFiltro('seleccion', 'España');
    expect(mockService.getCatalogo).toHaveBeenCalled();
  });
});
