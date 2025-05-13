import { Test, TestingModule } from '@nestjs/testing';
import { PeliculasService } from '../../../../src/peliculas/services/peliculas.service';
import { Pelicula } from '../../../../src/peliculas/model/peliculas.model';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { of } from 'rxjs';

describe('PeliculasService', () => {
  let service: PeliculasService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'API_URL') return 'http://fakeapi.com';
      if (key === 'API_KEY') return 'fakekey';
    }),
  };

  const mockPeliculaModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeliculasService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getModelToken(Pelicula), useValue: mockPeliculaModel },
      ],
    }).compile();

    service = module.get<PeliculasService>(PeliculasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('importarPopularesDesdeTMDB', () => {
    it('debería importar nuevas películas de TMDB', async () => {
      const fakePeliculas = {
        data: {
          results: [
            { title: 'Inception', overview: 'Un ladrón de sueños' },
            { title: 'Matrix', overview: 'Realidad simulada' },
          ],
        },
      };

      mockHttpService.get.mockReturnValue(of(fakePeliculas));
      mockPeliculaModel.findOne.mockResolvedValue(null);
      mockPeliculaModel.create.mockImplementation(p => Promise.resolve(p));

      const result = await service.importarPopularesDesdeTMDB();

      expect(mockHttpService.get).toHaveBeenCalledWith('http://fakeapi.com?api_key=fakekey');
      expect(result).toHaveLength(2);
      expect(result[0].titulo).toBe('Inception');
    });

    it('debería omitir películas ya existentes', async () => {
      const fakePeliculas = {
        data: {
          results: [
            { title: 'Matrix', overview: 'Simulación' },
          ],
        },
      };

      mockHttpService.get.mockReturnValue(of(fakePeliculas));
      mockPeliculaModel.findOne.mockResolvedValue({ id: 1 }); // Ya existe
      const result = await service.importarPopularesDesdeTMDB();

      expect(result).toEqual([]);
    });

    it('debería lanzar error si la API falla', async () => {
      mockHttpService.get.mockImplementation(() => {
        throw new Error('API Error');
      });

      await expect(service.importarPopularesDesdeTMDB()).rejects.toThrow(
        'No se pudo importar películas desde TMDB',
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las películas', async () => {
      const mockData = [{ titulo: 'Avatar' }];
      mockPeliculaModel.findAll.mockResolvedValue(mockData);

      const result = await service.findAll();

      expect(result).toEqual(mockData);
    });
  });

  describe('create', () => {
    it('debería crear una película', async () => {
      const payload = { titulo: 'Nueva Película' };
      mockPeliculaModel.create.mockResolvedValue(payload);

      const result = await service.create(payload);
      expect(result).toEqual(payload);
    });
  });
});
