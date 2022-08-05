import { Matches } from 'class-validator';

export class UpdateSettingsDto {
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  mondayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  tuesdayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  wednesdayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  thursdayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  fridayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  saturdayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  sundayStart: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  mondayEnd: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  tuesdayEnd: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  wednesdayEnd: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  thursdayEnd: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  fridayEnd: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  saturdayEnd: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  sundayEnd: string;
}
