import { Test, TestingModule } from '@nestjs/testing';
import { BoletasController } from '../../../../src/boletas/controllers/boletas.controller';
import { Boleta } from '../../../../src/boletas/model/boletas.model';
import { BoletasService } from '../../../../src/boletas/services/boletas.service';

describe('BoletasController', () => {
  let boletasController: BoletasController;
  let boletasService: BoletasService;

  // Configuración del módulo de prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletasController],
      providers: [
        {
          provide: BoletasService,
          useValue: {
            crearReserva: jest.fn().mockResolvedValue({ id: 1, ...mockBoleta }), // Simulación de `crearReserva`
            findAll: jest.fn().mockResolvedValue([mockBoleta]), // Simulación de `findAll`
          },
        },
      ],
    }).compile();

    boletasController = module.get<BoletasController>(BoletasController);
    boletasService = module.get<BoletasService>(BoletasService);
  });

  // Crear un mock de la boleta
  const mockBoleta: Partial<Boleta> = {
  "funcion_id": 1,
  "comprador": "Fabio Arango",
  "estado": "reservada"
};

  describe('reservar', () => {
    it('debería llamar a crearReserva y retornar un objeto', async () => {
      const boleta = { nombre: 'Boleta de Cine', sku: 'CIN123', price: 10, amount: 100 };
      const result = await boletasController.reservar(boleta as any);
      
      expect(boletasService.crearReserva).toHaveBeenCalledWith(boleta); // Verifica que el servicio fue llamado con el objeto correcto
      expect(result).toEqual({ id: 1, ...mockBoleta }); // Verifica que el resultado sea el esperado
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de boletas', async () => {
      const result = await boletasController.findAll();
      expect(boletasService.findAll).toHaveBeenCalled(); // Verifica que se haya llamado al método `findAll`
      expect(result).toEqual([mockBoleta]); // Verifica que el resultado sea un array con el mock de boleta
    });
  });
});