import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categorias } from '../model/categorias.model';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categorias) private categoriaModel: typeof Categorias,
  ) {}

  async create(nombre: string): Promise<Categorias> {
    return this.categoriaModel.create({ nombre });
  }

  async findAll(): Promise<Categorias[]> {
    return this.categoriaModel.findAll();
  }
}