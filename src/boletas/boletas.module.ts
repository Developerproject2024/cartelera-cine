import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Boleta } from './model/boletas.model';
import { Funcion } from 'src/funciones/model/funciones.model';
import { BoletasController } from './controllers/boletas.controller';
import { BoletasService } from './services/boletas.service';

@Module({
  imports: [SequelizeModule.forFeature([Boleta, Funcion])],
  controllers: [BoletasController],
  providers: [BoletasService],
})
export class BoletasModule {}
