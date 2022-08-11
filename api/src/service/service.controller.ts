import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  LoggerService,
  Inject,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastructure/jwt.guard';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto, @Req() req) {
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

    this.logger.log({
      message: 'new service created',
      service: newService,
      userId: req.user.id,
    });

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
    const service = await Service.getById(id);

    return {
      message: 'ok',
      data: service,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Req() req,
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

    const serviceToFind = await Service.getById(id);

    serviceToFind.description = updateServiceDto.description;
    serviceToFind.displayName = updateServiceDto.displayName;
    serviceToFind.lengthInMinutes = updateServiceDto.lengthInMinutes;

    serviceToFind.save();

    this.logger.log({
      message: 'new service updated',
      service: serviceToFind,
      userId: req.user.id,
    });

    return {
      message: 'ok',
      data: serviceToFind,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const serviceToFind = await Service.getById(id);

    const serviceCopy = serviceToFind;

    await serviceToFind.remove();

    this.logger.log({
      message: 'service removed',
      serviceId: serviceCopy,
      userId: req.user.id,
    });

    return {
      message: 'service successfully deleted',
    };
  }
}
