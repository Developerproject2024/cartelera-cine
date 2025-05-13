import { Controller, Post, Get, Body } from '@nestjs/common';
import { BoletasService } from '../services/boletas.service';
import { Boleta } from '../model/boletas.model';

@Controller('boletas')
export class BoletasController {
  constructor(private readonly boletasService: BoletasService) {}

  @Post()
  async reservar(@Body() body: Partial<Boleta>) {
    return this.boletasService.crearReserva(body);
  }

  @Get()
  findAll() {
    return this.boletasService.findAll();
  }
}