import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Funcion } from '../../funciones/model/funciones.model';

@Table({ tableName: 'boletas' })
export class Boleta extends Model<Boleta> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Funcion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  funcion_id: number;

  @BelongsTo(() => Funcion)
  funcion: Funcion;

  @Column({ type: DataType.STRING, allowNull: false })
  comprador: string;

  @Column({ type: DataType.STRING, allowNull: false })
  estado: string;
}
