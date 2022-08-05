import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Controller('service')
export class ServiceController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const serviceWithSameDisplayNameExists = await Service.findOneBy({
      displayName: createServiceDto.displayName,
    });

    if (serviceWithSameDisplayNameExists) {
      return {
        errors: {
          displayName: ['service with the same displayname already exists'],
        },
        message: 'service with the same displayname already exists',
      };
    }

    const newService = new Service();
    newService.description = createServiceDto.description;
    newService.displayName = createServiceDto.displayName;
    newService.lengthInMinutes = createServiceDto.lengthInMinutes;
    await newService.save();

    return {
      message: 'service successfully created',
      data: newService,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const services = await Service.find();

    return {
      message: 'ok',
      data: services,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await Service.findOneBy({ id: id });

    if (!service)
      throw new NotFoundException('service with the specified id not found');

    return {
      message: 'ok',
      data: service,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const serviceWithSameDisplayNameExists = await Service.findOneBy({
      displayName: updateServiceDto.displayName,
    });

    if (
      serviceWithSameDisplayNameExists &&
      serviceWithSameDisplayNameExists.id !== id
    ) {
      return {
        errors: {
          displayName: ['service with the same displayname already exists'],
        },
        message: 'service with the same displayname already exists',
      };
    }

    const serviceToFind = await Service.findOneBy({ id: id });

    if (!serviceToFind)
      throw new NotFoundException('service with the specified id not found');

    serviceToFind.description = updateServiceDto.description;
    serviceToFind.displayName = updateServiceDto.displayName;
    serviceToFind.lengthInMinutes = updateServiceDto.lengthInMinutes;

    serviceToFind.save();

    return {
      message: 'ok',
      data: serviceToFind,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const serviceToFind = await Service.findOneBy({ id: id });

    if (!serviceToFind)
      throw new NotFoundException('service with the specified id not found');

    await serviceToFind.remove();

    return {
      message: 'service successfully deleted',
    };
  }
}
