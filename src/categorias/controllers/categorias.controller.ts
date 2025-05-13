import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body('nombre') nombre: string) {
    return this.categoriasService.create(nombre);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }
}