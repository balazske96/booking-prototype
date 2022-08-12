import { User } from 'src/auth/entities/user.entity';
import { IMailable } from './mailable.interface';

export class UserVerifyLink implements IMailable {
  to: string;
  from?: string;
  subject = 'Regisztráció';
  template = './user-verify-link';

  constructor(
    private readonly user: User,
    private readonly verificationLink: string,
  ) {
    this.to = user.email;
  }

  getContext() {
    return {
      preheader: 'Regisztrálták rendszerünkbe.',
      verificationLink: this.verificationLink,
    };
  }
}
