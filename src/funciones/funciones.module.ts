import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Funcion } from './model/funciones.model';
import { Pelicula } from 'src/peliculas/model/peliculas.model';
import { FuncionesController } from './controllers/funciones.controller';
import { FuncionesService } from './services/funciones.service';

@Module({
  imports: [SequelizeModule.forFeature([Funcion, Pelicula])],
  controllers: [FuncionesController],
  providers: [FuncionesService],
})
export class FuncionesModule {}
