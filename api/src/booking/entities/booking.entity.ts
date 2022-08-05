import { Exclude } from 'class-transformer';
import * as moment from 'moment';
import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

import { BookingStatus } from './booking-status.enum';

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

  @Column('varchar', { length: 200, name: 'comment', nullable: true })
  comment: string;

  @Column('varchar', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 100 })
  lastName: string;

  @Column('enum', {
    name: 'status',
    enum: BookingStatus,
    default: BookingStatus.CREATED,
  })
  status: BookingStatus;

  @ManyToOne(() => Service, (service) => service.bookings, { lazy: false })
  service: Service;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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

  static addMinutesToMoment(
    baseMoment: moment.Moment,
    minutes: number,
  ): moment.Moment {
    const newMoment = moment(baseMoment);
    return newMoment.add(minutes, 'minutes');
  }

  static async isBookingOverlappingWithOtherBookings(
    dateOfBooking: string,
    timeOfBooking: string,
    lengthOfService: number,
    bookingToExclude?: Booking,
  ): Promise<boolean> {
    const timeOfBookingStartAsMoment = Booking.getTimeAsMoment(timeOfBooking);
    const timeOfBookingEndAsMoment = Booking.addMinutesToMoment(
      timeOfBookingStartAsMoment,
      lengthOfService,
    );

    let allBookingOnTheGivenDay = await Booking.findBy({
      date: dateOfBooking,
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
          timeOfBookingStartAsMoment > existingBookingStartAsMoment &&
          timeOfBookingStartAsMoment < existingBookingEndAsMoment;

        // Booking end is between another booking start end and
        const endIsOverlapping =
          timeOfBookingEndAsMoment > existingBookingStartAsMoment &&
          timeOfBookingEndAsMoment < existingBookingEndAsMoment;

        return startIsOverlapping || endIsOverlapping;
      },
    );

    return bookingIsOverlapping;
  }
}
