import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BookingStatus } from '../entities/booking-status.enum';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends CreateBookingDto {
  @ApiProperty()
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
