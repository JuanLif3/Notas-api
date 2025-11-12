import { Module } from '@nestjs/common';
import { NotasModule } from './notas/notas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 1. Cargar el .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configuracion del TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        // 3. Lee la URL desde el .env
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true, // Carga las entidades (tablas) que definamos
        synchronize: true, // Sincroniza la DB (crea las tablas)
      }),
    }),
    NotasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
