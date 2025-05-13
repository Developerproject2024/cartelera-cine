import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Pelicula } from 'src/peliculas/model/peliculas.model';

@Table({ tableName: 'categorias' })
export class Categorias extends Model<Categorias> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

  @HasMany(() => Pelicula)
  peliculas: Pelicula[];
}