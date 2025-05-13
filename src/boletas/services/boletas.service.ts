import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Boleta } from '../model/boletas.model';
import { Funcion } from '../../funciones/model/funciones.model';

@Injectable()
export class BoletasService {
  constructor(@InjectModel(Boleta) private readonly boletaModel: typeof Boleta,
              @InjectModel(Funcion) private readonly funcionModel: typeof Funcion
            ) {}
  

  findAll() {
    return this.boletaModel.findAll({ include: { all: true } });
  }
  
   async crearReserva(data: Partial<Boleta>) {
    const funcion = await this.funcionModel.findByPk(data.funcion_id);
    if (!funcion) {
      throw new NotFoundException('Función no encontrada');
    }

    if (funcion.capacidad_disponible <= 0) {
      throw new BadRequestException('No hay sillas disponibles para esta función');
    }
    const boleta = await this.boletaModel.create({
      funcion_id: data.funcion_id,
      comprador: data.comprador,
      estado: 'reservada',
    });
    
    funcion.capacidad_disponible -= 1;
    await funcion.save();

    return {
      mensaje: 'Boleta reservada exitosamente',
      boleta,
      capacidad_disponible_actualizada: funcion.capacidad_disponible,
    };
  }
}
