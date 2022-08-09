import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { BookingStatus } from '../entities/booking-status.enum';
import bookingConstants from '../infrastructure/constants';

export class ReadAllBookingDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(bookingConstants.minimumLimit, {
    message: `limit cannot be less then ${bookingConstants.minimumLimit}`,
  })
  limit?: number = bookingConstants.defaultLimit;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(bookingConstants.minimumPage)
  page?: number = bookingConstants.defaultPage;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'beforeDate must be a valid date format (YYYY-MM-DD)',
  })
  beforeDate?: string;

  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'afterDate must be a valid date format (YYYY-MM-DD)',
  })
  afterDate?: string;

  @IsOptional()
  @Matches(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/, {
    message: 'beforeTime must be a valid time format (HH:mm:ss)',
  })
  beforeTime?: string;

  @IsOptional()
  @Matches(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/, {
    message: 'afterTime must be a valid time format (HH:mm:ss)',
  })
  afterTime?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;
}
