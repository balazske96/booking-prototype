import { Booking } from 'src/booking/entities/booking.entity';
import { IMailable } from './mailable.interface';

export class BookingArrived implements IMailable {
  to: string;

  from?: string;

  subject = 'Foglalási szándéka beérkezett rendszerünkbe!';

  template = './booking-arrived';

  constructor(private booking: Booking) {
    this.to = booking.email;
  }

  getContext() {
    return {
      preheader: 'Foglalási szándéka beérkezett rendszerünkbe!',
      firstName: this.booking.firstName,
      lastName: this.booking.lastName,
    };
  }
}
