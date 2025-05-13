import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pelicula } from '../model/peliculas.model';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PeliculasService {
  
  private readonly API_URL = this.configService.get<string>('API_URL');;
  private readonly API_KEY = this.configService.get<string>('API_KEY');;

  constructor(@InjectModel(Pelicula) private readonly peliculaModel: typeof Pelicula,
  private readonly httpService: HttpService,
  private readonly configService: ConfigService
  ) {}

  create(data: Partial<Pelicula>) {
    return this.peliculaModel.create(data);
  }

  findAll() {
    return this.peliculaModel.findAll({ include: { all: true } });
  }

  async importarPopularesDesdeTMDB(): Promise<Pelicula[]> {
  const logger = new Logger('PeliculasService');
  const peliculasGuardadas: Pelicula[] = [];

  try {
    const url = `${this.API_URL}?api_key=${this.API_KEY}`;
    const response = await firstValueFrom(this.httpService.get(url));
    const peliculasTMDB = response.data.results;

    for (const p of peliculasTMDB) {
      try {
        const existente = await this.peliculaModel.findOne({
          where: Sequelize.where(
            Sequelize.fn('lower', Sequelize.col('titulo')),
            Sequelize.fn('lower', p.title),
          ),
        });

        if (existente) {
          logger.debug(`Película ya existente: ${p.title}`);
          continue;
        }

        const pelicula = await this.peliculaModel.create({
          titulo: p.title,
          descripcion: p.overview,
          duracion: 120, // valor por defecto
          categoria_id: 1, // ajustable según tu lógica
        });

        peliculasGuardadas.push(pelicula);
        logger.log(`Película guardada: ${p.title}`);
      } catch (err) {
        logger.error(`Error al procesar película "${p.title}":`, err.message);
      }
    }

    return peliculasGuardadas;
  } catch (error) {
    logger.error('Error al obtener películas desde TMDB:', error.message);
    throw new Error('No se pudo importar películas desde TMDB');
  }
}
}
