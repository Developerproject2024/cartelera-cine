import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Categorias } from '../../categorias/model/categorias.model';
import { Funcion } from '../../funciones/model/funciones.model';

@Table({ tableName: 'peliculas' })
export class Pelicula extends Model<Pelicula> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  titulo: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  descripcion: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duracion: number;

  @ForeignKey(() => Categorias)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoria_id: number;

  @BelongsTo(() => Categorias)
  categoria: Categorias;

  @HasMany(() => Funcion)
  funciones: Funcion[];
}