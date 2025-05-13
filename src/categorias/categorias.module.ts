import { Module } from '@nestjs/common';
import { CategoriasController } from './controllers/categorias.controller';
import { CategoriasService } from './services/categorias.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categorias } from './model/categorias.model';

@Module({
    imports: [SequelizeModule.forFeature([Categorias])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
