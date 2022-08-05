import { IsDateString, Matches, MaxLength, ValidateIf } from 'class-validator';

export class CreateHolidayDto {
  @MaxLength(300)
  @ValidateIf((object, value) => value !== null)
  comment: string;

  @IsDateString()
  startDate: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  startTime: string;

  @IsDateString()
  endDate: string;

  @Matches('[0-2][0-9]:[0-6][0-9]:[0-6][0-9]')
  endTime: string;
}
