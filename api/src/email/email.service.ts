import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailable } from './infrastructure/mailable.interface';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMailable(mailable: IMailable) {
    const content = {
      to: mailable.to,
      subject: mailable.subject,
      template: mailable.template,
      context: mailable.getContext(),
    };

    if (mailable.from) content['from'] = mailable.from;

    await this.mailerService.sendMail(content);
  }
}
