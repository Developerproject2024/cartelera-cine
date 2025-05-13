import { Test, TestingModule } from '@nestjs/testing';
import { FuncionesController } from '../../../../src/funciones/controllers/funciones.controller';
import { FuncionesService } from '../../../../src/funciones/services/funciones.service';
import { Funcion } from '../../../../src/funciones/model/funciones.model';

describe('FuncionesController', () => {
  let controller: FuncionesController;
  let service: FuncionesService;

  const mockFuncionesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    consultarDisponibilidad: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionesController],
      providers: [
        { provide: FuncionesService, useValue: mockFuncionesService },
      ],
    }).compile();

    controller = module.get<FuncionesController>(FuncionesController);
    service = module.get<FuncionesService>(FuncionesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear una función', async () => {
      const funcionDto: Partial<Funcion> = {
        pelicula_id: 1,
        fecha: '2025-06-01',
        hora: '18:00',
        capacidad_disponible: 50,
      };

      const result = { id: 1, ...funcionDto };
      mockFuncionesService.create.mockResolvedValue(result);

      expect(await controller.create(funcionDto)).toEqual(result);
      expect(mockFuncionesService.create).toHaveBeenCalledWith(funcionDto);
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las funciones', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockFuncionesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockFuncionesService.findAll).toHaveBeenCalled();
    });
  });

  describe('consultarDisponibilidad', () => {
    it('debería retornar la disponibilidad de una función por id', async () => {
      const funcionId = 1;
      const disponibilidad = { capacidad_disponible: 30 };

      mockFuncionesService.consultarDisponibilidad.mockResolvedValue(disponibilidad);

      expect(await controller.consultarDisponibilidad(funcionId)).toEqual(disponibilidad);
      expect(mockFuncionesService.consultarDisponibilidad).toHaveBeenCalledWith(funcionId);
    });
  });
});
