import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(320)
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
