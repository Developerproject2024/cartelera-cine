import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from '../../../../src/categorias/controllers/categorias.controller';
import { CategoriasService } from '../../../../src/categorias/services/categorias.service';

describe('CategoriasController', () => {
  let controller: CategoriasController;
  let service: CategoriasService;

  const mockCategoriasService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [
        {
          provide: CategoriasService,
          useValue: mockCategoriasService,
        },
      ],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
    service = module.get<CategoriasService>(CategoriasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería llamar al servicio con el nombre correcto', async () => {
      const nombre = 'Comedia';
      const expected = { id: 1, nombre };

      mockCategoriasService.create.mockResolvedValue(expected);

      const result = await controller.create(nombre);

      expect(service.create).toHaveBeenCalledWith(nombre);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('debería devolver todas las categorías', async () => {
      const expected = [
        { id: 1, nombre: 'Acción' },
        { id: 2, nombre: 'Terror' },
      ];

      mockCategoriasService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });
});