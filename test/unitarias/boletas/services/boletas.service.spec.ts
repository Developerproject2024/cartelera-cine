import { Test, TestingModule } from '@nestjs/testing';
import { BoletasService } from '../../../../src/boletas/services/boletas.service';
import { getModelToken } from '@nestjs/sequelize';
import { Boleta } from '../../../../src/boletas/model/boletas.model';
import { Funcion } from '../../../../src/funciones/model/funciones.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BoletasService', () => {
  let service: BoletasService;

  // Mock de los modelos
  const boletaMock = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const funcionMock = {
    findByPk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoletasService,
        { provide: getModelToken(Boleta), useValue: boletaMock },
        { provide: getModelToken(Funcion), useValue: funcionMock },
      ],
    }).compile();

    service = module.get<BoletasService>(BoletasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('debería devolver todas las boletas con sus relaciones', async () => {
      const expected = [{ id: 1, comprador: 'Juan' }];
      boletaMock.findAll.mockResolvedValue(expected);

      const result = await service.findAll();
      expect(result).toEqual(expected);
      expect(boletaMock.findAll).toHaveBeenCalledWith({ include: { all: true } });
    });
  });

  describe('crearReserva', () => {
    const input = {
      funcion_id: 1,
      comprador: 'Juan',
    };

    it('debería lanzar NotFoundException si la función no existe', async () => {
      funcionMock.findByPk.mockResolvedValue(null);

      await expect(service.crearReserva(input)).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar BadRequestException si no hay capacidad disponible', async () => {
      funcionMock.findByPk.mockResolvedValue({ capacidad_disponible: 0 });

      await expect(service.crearReserva(input)).rejects.toThrow(BadRequestException);
    });

    it('debería crear una boleta si hay capacidad', async () => {
      const saveMock = jest.fn();
      const funcion = {
        id: 1,
        capacidad_disponible: 5,
        save: saveMock,
      };

      const createdBoleta = { id: 10, comprador: 'Juan' };

      funcionMock.findByPk.mockResolvedValue(funcion);
      boletaMock.create.mockResolvedValue(createdBoleta);

      const result = await service.crearReserva(input);

      expect(boletaMock.create).toHaveBeenCalledWith({
        funcion_id: input.funcion_id,
        comprador: input.comprador,
        estado: 'reservada',
      });
      expect(funcion.capacidad_disponible).toBe(4); // 5 - 1
      expect(saveMock).toHaveBeenCalled();

      expect(result).toEqual({
        mensaje: 'Boleta reservada exitosamente',
        boleta: createdBoleta,
        capacidad_disponible_actualizada: 4,
      });
    });
  });
});