import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Funcion } from '../model/funciones.model';

@Injectable()
export class FuncionesService {
  constructor(@InjectModel(Funcion) private funcionModel: typeof Funcion) {}

  async create(data: Partial<Funcion>) {
    const existente = await this.funcionModel.findOne({
      where: {
        fecha: data.fecha,
        hora: data.hora,
        sala: data.sala,
      },
    });
    if (existente) {
      throw new ConflictException('Ya existe una función con esa fecha, hora y sala.');
    }
    
    return this.funcionModel.create(data);
  }

  findAll() {
    return this.funcionModel.findAll({ include: { all: true } });
  }

  async consultarDisponibilidad(funcionId: number): Promise<number> {
    const funcion = await this.funcionModel.findByPk(funcionId);

    if (!funcion) {
      throw new NotFoundException('Función no encontrada');
    }

    return funcion.capacidad_disponible;
  }
}