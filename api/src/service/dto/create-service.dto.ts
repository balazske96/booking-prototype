import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  @MaxLength(300)
  description: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  displayName: string;

  @ApiProperty()
  @IsNumber()
  @Max(480)
  @Min(5)
  lengthInMinutes: number;
}
