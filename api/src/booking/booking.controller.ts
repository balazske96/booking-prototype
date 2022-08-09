import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Service } from 'src/service/entities/service.entity';
import { EmailService } from 'src/email/email.service';

@Controller('booking')
export class BookingController {
  constructor(private emailService: EmailService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    const serviceId = createBookingDto.serviceId;
    await Service.validateIfServiceExists(serviceId);
    await Booking.validateBookingIsInThePast(
      createBookingDto.date,
      createBookingDto.time,
    );

    const service = await Service.findOneBy({ id: serviceId });

    const newBooking = new Booking();
    newBooking.comment = createBookingDto.comment;
    newBooking.date = createBookingDto.date;
    newBooking.email = createBookingDto.email;
    newBooking.firstName = createBookingDto.firstName;
    newBooking.lastName = createBookingDto.lastName;
    newBooking.time = createBookingDto.time;
    newBooking.lengthOfServiceInMinutes = service.lengthInMinutes;
    newBooking.service = service;
    await newBooking.save();

    await this.emailService.sendWeGotTheBookingMail(newBooking);

    return {
      message: 'ok',
      data: newBooking,
    };
  }

  @Get()
  async findAll() {
    const bookings = await Booking.find({ relations: ['service'] });

    return {
      message: 'ok',
      data: bookings,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const booking = await Booking.findOneBy({ id: id });

    if (!booking)
      throw new NotFoundException('booking with the specified id not found');

    return {
      message: 'ok',
      data: booking,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const bookingToUpdate = await Booking.findOneBy({ id: id });
    const service = await Service.findOneBy({ id: updateBookingDto.serviceId });

    if (!bookingToUpdate)
      throw new NotFoundException('booking with the specified id not found');

    if (!service)
      throw new NotFoundException('service with the specified id not found');

    await Booking.validateIfBookingIsOverlappingWithOtherBookings(
      updateBookingDto.date,
      updateBookingDto.time,
      service.lengthInMinutes,
      bookingToUpdate,
    );

    bookingToUpdate.comment = updateBookingDto.comment;
    bookingToUpdate.date = updateBookingDto.date;
    bookingToUpdate.email = updateBookingDto.email;
    bookingToUpdate.firstName = updateBookingDto.firstName;
    bookingToUpdate.lastName = updateBookingDto.lastName;
    bookingToUpdate.status = updateBookingDto.status;
    bookingToUpdate.time = updateBookingDto.time;
    bookingToUpdate.lengthOfServiceInMinutes = service.lengthInMinutes;
    bookingToUpdate.service = service;
    await bookingToUpdate.save();

    return {
      message: 'ok',
      data: bookingToUpdate,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const bookingToDelete = await Booking.findOneBy({ id: id });

    if (!bookingToDelete)
      throw new NotFoundException('booking with the specified id not found');

    await bookingToDelete.softRemove();

    return {
      message: 'booking successfully deleted',
    };
  }
}
