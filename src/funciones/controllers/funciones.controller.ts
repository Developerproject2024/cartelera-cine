import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FuncionesService } from '../services/funciones.service';
import { Funcion } from '../model/funciones.model';

@Controller('funciones')
export class FuncionesController {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Post()
  create(@Body() funcion: Partial<Funcion>) {
    return this.funcionesService.create(funcion);
  }

  @Get()
  findAll() {
    return this.funcionesService.findAll();
  }
  
  @Get(':id/disponibilidad')
  consultarDisponibilidad(@Param('id') id: number) {
    return this.funcionesService.consultarDisponibilidad(id);
  }
}