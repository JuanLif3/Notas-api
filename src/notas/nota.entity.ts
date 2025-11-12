import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// 1. @Entity(): Le dice a TypeORM que esto es una "Entidad" (una tabla).
@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  contenido: string;

  @Column({ default: false })
  archivada: boolean;

  @Column({ default: 'pendiente' })
  @IsString()
  @IsIn(['pendiente', 'en_proceso', 'completada'])
  status: string;

  @Column({ default: 'media' })
  @IsString()
  @IsIn(['baja', 'media', 'alta'])
  @IsOptional()
  prioridad: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsISO8601()
  dueDate: Date;
}
