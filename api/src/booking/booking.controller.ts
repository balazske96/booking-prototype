import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Service } from 'src/service/entities/service.entity';
import { EmailService } from 'src/email/email.service';
import { ReadAllBookingDto } from './dto/read-all-booking.dto';
import { BookingStatus } from './entities/booking-status.enum';
import { BookingApprovedMail } from 'src/email/infrastructure/booking-approved-mail';
import { BookingCanceledMail } from 'src/email/infrastructure/booking-canceled-mail';
import { BookingArrived } from 'src/email/infrastructure/booking-arrived';

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

    const bookingArrivedMail = new BookingArrived(newBooking);
    await this.emailService.sendMailable(bookingArrivedMail);

    return {
      message: 'ok',
      data: newBooking,
    };
  }

  @Get()
  async findAll(@Query() readAllQueryParams: ReadAllBookingDto) {
    const bookings = await Booking.findByQueryParams(readAllQueryParams);
    const hasNext = await Booking.calculateHasNext(readAllQueryParams);
    const numberOfBookingsBasedOnFilters =
      await Booking.getNumberOfBookingBasedOnFilters(readAllQueryParams);

    return {
      message: 'ok',
      data: bookings,
      meta: {
        hasNext: hasNext,
        available: numberOfBookingsBasedOnFilters,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const booking = await Booking.getById(id);

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
    const bookingToUpdate = await Booking.getById(id);
    const service = await Service.getById(updateBookingDto.serviceId);

    if (updateBookingDto.status === BookingStatus.APPROVED) {
      await Booking.validateIfBookingIsOverlappingWithOtherBookings(
        updateBookingDto.date,
        updateBookingDto.time,
        service.lengthInMinutes,
        bookingToUpdate,
      );
    }

    const statusChaned = bookingToUpdate.status !== updateBookingDto.status;

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

    if (statusChaned) {
      switch (bookingToUpdate.status) {
        case BookingStatus.APPROVED:
          const approvedMail = new BookingApprovedMail(bookingToUpdate);
          await this.emailService.sendMailable(approvedMail);
          break;
        case BookingStatus.CANCELED:
          const canceledMail = new BookingCanceledMail(bookingToUpdate);
          await this.emailService.sendMailable(canceledMail);
          break;
      }
    }

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
