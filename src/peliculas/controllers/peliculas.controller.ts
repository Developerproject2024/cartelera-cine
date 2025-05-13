import { Controller, Post, Get } from '@nestjs/common';
import { PeliculasService } from '../services/peliculas.service';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  // @Post()
  // create(@Body() pelicula: Partial<Pelicula>) {
  //   return this.peliculasService.create(pelicula);
  // }
  @Post()
  public importarDesdeTMDB  () {
    return this.peliculasService.importarPopularesDesdeTMDB();
  }

  @Get()
  public findAll() {
    return this.peliculasService.findAll();
  }


}