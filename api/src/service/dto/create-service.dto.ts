import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateServiceDto {
  @IsString()
  @MaxLength(300)
  description: string;

  @IsString()
  @MaxLength(100)
  displayName: string;

  @IsNumber()
  @Max(480)
  @Min(5)
  lengthInMinutes: number;
}
