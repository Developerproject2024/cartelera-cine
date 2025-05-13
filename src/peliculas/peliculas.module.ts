import { Module } from '@nestjs/common';
import { PeliculasController } from './controllers/peliculas.controller';
import { PeliculasService } from './services/peliculas.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pelicula } from './model/peliculas.model';
import { Categorias } from 'src/categorias/model/categorias.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SequelizeModule.forFeature([Pelicula, Categorias]), HttpModule],
  controllers: [PeliculasController],
  providers: [PeliculasService],
})
export class PeliculasModule {}
