import { Module } from '@nestjs/common';
import { SalasController } from './controllers/salas.controller';
import { SalasService } from './services/salas.service';

@Module({

  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
