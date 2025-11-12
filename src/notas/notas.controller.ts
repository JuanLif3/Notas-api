import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get()
  async findAll() {
    return this.notasService.findAll();
  }

  @Post()
  async create(@Body() createNotaDto: CreateNotaDto) {
    return await this.notasService.create(createNotaDto);
  }

  @Get(':id')
  async findOne(
    // 2. @Param('id') extrae el ID de la URL
    // 3. 'ParseIntPipe' lo convierte automáticamente de 'string' a 'number'
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.notasService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotaDto: UpdateNotaDto,
  ) {
    return await this.notasService.update(id, updateNotaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.notasService.delete(id);
  }
}
