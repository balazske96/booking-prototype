import {
  IsDateString,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  date: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  time: string;

  @IsEmail()
  email: string;

  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsString()
  @Matches(/((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/)
  phone: string;

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
