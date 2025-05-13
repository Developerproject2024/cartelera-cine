import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Boleta } from 'src/boletas/model/boletas.model';
import { Pelicula } from 'src/peliculas/model/peliculas.model';

@Table({ tableName: 'funciones' })
export class Funcion extends Model<Funcion> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Pelicula)
  @Column({ type: DataType.INTEGER, allowNull: false })
  pelicula_id: number;

  @BelongsTo(() => Pelicula)
  pelicula: Pelicula;

  @Column({ type: DataType.STRING, allowNull: false })
  sala: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  fecha: string;

  @Column({ type: DataType.TIME, allowNull: false })
  hora: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  capacidad_total: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  capacidad_disponible: number;

  @HasMany(() => Boleta)
  boletas: Boleta[];
}