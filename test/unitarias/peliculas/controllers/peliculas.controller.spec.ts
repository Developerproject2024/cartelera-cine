import { Test, TestingModule } from '@nestjs/testing';
import { PeliculasController } from '../../../../src/peliculas/controllers/peliculas.controller';
import { PeliculasService } from '../../../../src/peliculas/services/peliculas.service';

describe('PeliculasController', () => {
  let controller: PeliculasController;
  let service: PeliculasService;

  const mockPeliculasService = {
    importarPopularesDesdeTMDB: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeliculasController],
      providers: [
        {
          provide: PeliculasService,
          useValue: mockPeliculasService,
        },
      ],
    }).compile();

    controller = module.get<PeliculasController>(PeliculasController);
    service = module.get<PeliculasService>(PeliculasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('importarDesdeTMDB', () => {
    it('debería llamar a peliculasService.importarPopularesDesdeTMDB', async () => {
      const result = { message: 'Películas importadas' };
      mockPeliculasService.importarPopularesDesdeTMDB.mockResolvedValue(result);

      const response = await controller.importarDesdeTMDB();

      expect(service.importarPopularesDesdeTMDB).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las películas', async () => {
      const mockPeliculas = [
        { id: 1, titulo: 'Matrix' },
        { id: 2, titulo: 'Inception' },
      ];
      mockPeliculasService.findAll.mockResolvedValue(mockPeliculas);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPeliculas);
    });
  });
});
