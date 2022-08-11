import * as moment from 'moment';
import { Service } from '../../service/entities/service.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { BookingStatus } from './booking-status.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ReadAllBookingDto } from '../dto/read-all-booking.dto';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('date', { name: 'date' })
  date: string;

  @Column('time', { name: 'time' })
  time: string;

  @Column('smallint', { name: 'length_of_service_in_minutes' })
  lengthOfServiceInMinutes: number;

  @Column('varchar', { nullable: false, name: 'email', length: 320 })
  email: string;

  @Column('varchar', { length: 100 })
  phone: string;

  @Column('varchar', { length: 200, name: 'comment', nullable: true })
  comment: string;

  @Column('varchar', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 100 })
  lastName: string;

  @Column('enum', {
    name: 'status',
    enum: BookingStatus,
    default: BookingStatus.NEW,
  })
  status: BookingStatus;

  @ManyToOne(() => Service, (service) => service.bookings, { lazy: false })
  service: Service;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedDate: Date;

  getTimeOfBookingStartAsMoment(): moment.Moment {
    return moment(this.time, 'HH:mm:ss');
  }

  getEndTimeOfBookingStartAsMoment(): moment.Moment {
    const bookingTimeAsMoment = this.getTimeOfBookingStartAsMoment();
    return bookingTimeAsMoment.add(this.lengthOfServiceInMinutes, 'minutes');
  }

  static getTimeAsMoment(time: string): moment.Moment {
    return moment(time, 'HH:mm:ss');
  }

  static async getById(id: string): Promise<Booking> {
    const booking = await Booking.findOne({
      where: { id: id },
      relations: ['service'],
    });

    if (!booking)
      throw new HttpException(
        {
          message: 'not found',
          errors: {
            id: 'booking with the specified id not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );

    return booking;
  }

  static addMinutesToMoment(
    baseMoment: moment.Moment,
    minutes: number,
  ): moment.Moment {
    const newMoment = moment(baseMoment);
    return newMoment.add(minutes, 'minutes');
  }

  static async validateBookingIsInThePast(date: string, time: string) {
    const bookingDateAsMoment = moment(
      `${date}-${time}`,
      'YYYY-MM-DD-HH:mm:ss',
    );

    const dateIsInThePast = moment().isAfter(bookingDateAsMoment, 'day');
    const timeIsInThePast = moment().isAfter(bookingDateAsMoment, 'second');

    if (dateIsInThePast)
      throw new HttpException(
        {
          message: 'booking date cannot be in the past',
          errors: {
            date: 'booking date cannot be in the past',
          },
        },
        HttpStatus.OK,
      );

    if (timeIsInThePast)
      throw new HttpException(
        {
          message: 'booking time cannot be in the past',
          errors: {
            time: 'booking time cannot be in the past',
          },
        },
        HttpStatus.OK,
      );
  }

  static async validateIfBookingIsOverlappingWithOtherBookings(
    dateOfBooking: string,
    timeOfBooking: string,
    lengthOfService: number,
    bookingToExclude?: Booking,
  ): Promise<void> {
    const timeOfBookingStartAsMoment = Booking.getTimeAsMoment(timeOfBooking);
    const timeOfBookingEndAsMoment = Booking.addMinutesToMoment(
      timeOfBookingStartAsMoment,
      lengthOfService,
    );

    let allBookingOnTheGivenDay = await Booking.findBy({
      date: dateOfBooking,
      status: BookingStatus.APPROVED,
    });

    if (bookingToExclude)
      allBookingOnTheGivenDay = allBookingOnTheGivenDay.filter(
        (booking: Booking) => booking.id !== bookingToExclude.id,
      );

    const bookingIsOverlapping = allBookingOnTheGivenDay.some(
      (booking: Booking) => {
        const existingBookingStartAsMoment =
          booking.getTimeOfBookingStartAsMoment();
        const existingBookingEndAsMoment =
          booking.getEndTimeOfBookingStartAsMoment();

        // Booking start is between another booking start and end
        const startIsOverlapping =
          timeOfBookingStartAsMoment >= existingBookingStartAsMoment &&
          timeOfBookingStartAsMoment <= existingBookingEndAsMoment;

        // Booking end is between another booking start end and
        const endIsOverlapping =
          timeOfBookingEndAsMoment >= existingBookingStartAsMoment &&
          timeOfBookingEndAsMoment <= existingBookingEndAsMoment;

        return startIsOverlapping || endIsOverlapping;
      },
    );

    if (bookingIsOverlapping)
      throw new HttpException(
        {
          message: 'the selected time is overlapping with other bookings',
          errors: {
            time: 'the selected time is overlapping with other bookings',
          },
        },
        HttpStatus.OK,
      );
  }

  private static getFilteredReadAllQueryBuilder(
    queryParams: ReadAllBookingDto,
  ): SelectQueryBuilder<Booking> {
    const {
      limit,
      page,
      firstName,
      lastName,
      email,
      status,
      beforeDate,
      afterDate,
      beforeTime,
      afterTime,
      serviceId,
    } = queryParams;

    const offset = limit * (page - 1);

    const baseQueryBuilder = Booking.createQueryBuilder(
      'booking',
    ).leftJoinAndSelect('booking.service', 'service');

    if (firstName)
      baseQueryBuilder.where('booking.first_name LIKE %:firstName%', {
        firstName,
      });

    if (lastName)
      baseQueryBuilder.andWhere('booking.last_name LIKE %:lastName%', {
        lastName,
      });

    if (email)
      baseQueryBuilder.andWhere('booking.email LIKE %:email%', {
        email,
      });

    if (serviceId)
      baseQueryBuilder.andWhere('service.id = :serviceId', {
        serviceId,
      });

    if (status)
      baseQueryBuilder.andWhere('booking.status = :status', { status });

    if (beforeDate)
      baseQueryBuilder.andWhere('booking.date <= :beforeDate', { beforeDate });

    if (afterDate)
      baseQueryBuilder.andWhere('booking.date >= :afterDate', { afterDate });

    if (beforeTime)
      baseQueryBuilder.andWhere('booking.time <= :beforeTime', { beforeTime });

    if (afterTime)
      baseQueryBuilder.andWhere('booking.time >= :afterTime', { afterTime });

    baseQueryBuilder.skip(offset).take(limit);

    return baseQueryBuilder;
  }

  static async findByQueryParams(
    queryParams: ReadAllBookingDto,
  ): Promise<Booking[]> {
    const baseQueryBuilder =
      Booking.getFilteredReadAllQueryBuilder(queryParams);

    return await baseQueryBuilder.getMany();
  }

  static async getNumberOfBookingBasedOnFilters(
    filters: ReadAllBookingDto,
  ): Promise<number> {
    return await Booking.getFilteredReadAllQueryBuilder(filters).getCount();
  }

  static async calculateHasNext(
    queryParams: ReadAllBookingDto,
  ): Promise<boolean> {
    const bookingQueryWithIncreasedPagination = await Booking.findByQueryParams(
      { ...queryParams, page: queryParams.page + 1 },
    );

    return bookingQueryWithIncreasedPagination.length > 0;
  }
}
