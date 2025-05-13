import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from '../../../../src/categorias/services/categorias.service';
import { getModelToken } from '@nestjs/sequelize';
import { Categorias } from '../../../../src/categorias/model/categorias.model';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let categoriaModel: typeof Categorias;

  const mockCategoriaModel = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getModelToken(Categorias),
          useValue: mockCategoriaModel,
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    categoriaModel = module.get(getModelToken(Categorias));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear una nueva categoría', async () => {
      const nombre = 'Aventura';
      const expected = { id: 1, nombre };

      mockCategoriaModel.create.mockResolvedValue(expected);

      const result = await service.create(nombre);

      expect(mockCategoriaModel.create).toHaveBeenCalledWith({ nombre });
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las categorías', async () => {
      const expected = [
        { id: 1, nombre: 'Acción' },
        { id: 2, nombre: 'Drama' },
      ];

      mockCategoriaModel.findAll.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(mockCategoriaModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });
});
