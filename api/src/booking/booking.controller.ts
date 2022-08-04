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

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('booking')
export class BookingController {
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    throw new NotImplementedException();
  }

  @Get()
  async findAll() {
    throw new NotImplementedException();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    throw new NotImplementedException();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
