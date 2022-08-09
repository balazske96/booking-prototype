import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailable } from './infrastructure/mailable.interface';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMailable(mailable: IMailable) {
    await this.mailerService.sendMail({
      to: mailable.to,
      from: mailable.from,
      subject: mailable.subject,
      template: mailable.template,
      context: mailable.getContext(),
    });
  }
}
