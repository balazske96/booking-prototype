import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
} from '@nestjs/common';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    throw new NotImplementedException();
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new NotImplementedException();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    throw new NotImplementedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
