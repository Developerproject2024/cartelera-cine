import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalasModule } from './salas/salas.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriasModule } from './categorias/categorias.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { FuncionesModule } from './funciones/funciones.module';
import { BoletasModule } from './boletas/boletas.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'database',
      models: [__dirname + '/**/*.model.ts'],
      autoLoadModels: true,
      synchronize: true,
    }),    
    SalasModule,
    CategoriasModule,
    PeliculasModule,
    FuncionesModule,
    BoletasModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
