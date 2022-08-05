import {
  IsDateString,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  date: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  time: string;

  @IsEmail()
  email: string;

  comment: string;

  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsString()
  serviceId: string;
}
