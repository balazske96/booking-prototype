import { IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  @MaxLength(320)
  email: string;

  @IsString()
  password: string;
}
