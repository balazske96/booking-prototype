import { IsString, MaxLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MaxLength(300)
  description: string;

  @IsString()
  @MaxLength(100)
  displayName: string;
}
