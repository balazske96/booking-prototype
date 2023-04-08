import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ default: 'admin02' })
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty({ default: 'admin02@admin.hu' })
  @IsString()
  @MaxLength(320)
  email: string;
}
