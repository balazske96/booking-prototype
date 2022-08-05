import { IsString, Matches, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  @MaxLength(320)
  email: string;

  @IsString()
  @Matches(/((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/)
  phone: string;

  @IsString()
  password: string;
}
