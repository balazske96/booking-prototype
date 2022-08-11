import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: false })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(bookingConstants.minimumLimit, {
    message: `limit cannot be less then ${bookingConstants.minimumLimit}`,
  })
  limit?: number = bookingConstants.defaultLimit;

  @ApiProperty({ required: false })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(bookingConstants.minimumPage)
  page?: number = bookingConstants.defaultPage;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'beforeDate must be a valid date format (YYYY-MM-DD)',
  })
  beforeDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'afterDate must be a valid date format (YYYY-MM-DD)',
  })
  afterDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/, {
    message: 'beforeTime must be a valid time format (HH:mm:ss)',
  })
  beforeTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/, {
    message: 'afterTime must be a valid time format (HH:mm:ss)',
  })
  afterTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  serviceId?: string;
}
