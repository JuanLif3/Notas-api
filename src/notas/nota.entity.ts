import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
