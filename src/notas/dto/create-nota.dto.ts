import { PickType } from '@nestjs/mapped-types';
import { Nota } from '../nota.entity';

export class CreateNotaDto extends PickType(Nota, [
  'titulo',
  'contenido',
  'dueDate',
]) {}
