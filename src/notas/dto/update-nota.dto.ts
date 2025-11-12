import { PartialType, PickType } from '@nestjs/mapped-types';
import { Nota } from '../nota.entity';

const UpdateNotaBase = PickType(Nota, [
  'titulo',
  'contenido',
  'status',
  'prioridad',
  'dueDate',
]);

export class UpdateNotaDto extends PartialType(UpdateNotaBase) {}
