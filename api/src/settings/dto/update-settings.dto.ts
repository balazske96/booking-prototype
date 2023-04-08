import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  mondayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  tuesdayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  wednesdayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  thursdayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  fridayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  saturdayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  sundayStart: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  mondayEnd: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  tuesdayEnd: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  wednesdayEnd: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  thursdayEnd: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  fridayEnd: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  saturdayEnd: string;

  @ApiProperty()
  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  sundayEnd: string;
}
