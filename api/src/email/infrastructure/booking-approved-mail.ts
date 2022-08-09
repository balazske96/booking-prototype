import { Booking } from 'src/booking/entities/booking.entity';
import { IMailable } from './mailable.interface';

export class BookingApprovedMail implements IMailable {
  to: string;

  from?: string;

  subject = 'Foglalását jóváhagytuk!';

  template = './booking-approved';

  constructor(private booking: Booking) {
    this.to = booking.email;
  }

  getContext() {
    return {
      preheader: 'Foglalását jóváhagytuk!',
      lastName: this.booking.lastName,
      firstName: this.booking.firstName,
      date: this.booking.date,
      time: this.booking.time,
      serviceName: this.booking.service.displayName,
      serviceLength: this.booking.lengthOfServiceInMinutes,
    };
  }
}
