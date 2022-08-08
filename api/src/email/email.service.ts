import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Booking } from 'src/booking/entities/booking.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendWeGotTheBookingMail(booking: Booking) {
    await this.mailerService.sendMail({
      to: booking.email,
      subject: 'Megkaptuk foglalási szándékát',
      template: './we-got-your-booking-request',
      context: {
        preheader: 'Foglalási szándéka beérkezett rendszerünkbe!',
        firstName: booking.firstName,
        lastName: booking.lastName,
      },
    });
  }
}
