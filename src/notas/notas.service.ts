import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Injectable()
export class NotasService {
  // INYECCIÓN DE DEPENDENCIA (El Constructor)
  // Le pedimos a NestJS que "inyecte" el repositorio
  // que registramos en 'notas.module.ts'.
  // 'notasRepository' es ahora nuestro acceso a la tabla 'nota'.
  constructor(
    @InjectRepository(Nota) private notasRepository: Repository<Nota>,
  ) {}

  async findAll(): Promise<Nota[]> {
    return this.notasRepository.find();
  }

  // Crear una nueva nota en la base de datos
  async create(createNotaDto: CreateNotaDto): Promise<Nota> {
    const nuevaNota = this.notasRepository.create(createNotaDto);
    return this.notasRepository.save(nuevaNota);
  }

  // Obtiene UNA nota
  async findOne(id: number): Promise<Nota> {
    const nota = await this.notasRepository.findOneBy({ id: id });
    if (!nota) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    }
    return nota;
  }

  // Actualiza una nota por su ID
  async update(id: number, updateNotaDto: UpdateNotaDto): Promise<Nota> {
    const nota = await this.findOne(id);
    // Fuciona los campos del DTo sobre la entidad encontrada
    Object.assign(nota, updateNotaDto);
    return this.notasRepository.save(nota);
  }

  // Alimina una nota por su ID
  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.notasRepository.delete(id);
  }
}
