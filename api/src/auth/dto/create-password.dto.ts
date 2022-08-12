import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreatePasswordDto {
  @ApiProperty({ default: 'AdminPassword123!' })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,32}$/,
    {
      message:
        'The password must contain at least one lowercase and one uppercase letter, a special character (@$!%*?&), be at least 16 characters long and up to 32 characters long',
    },
  )
  password: string;

  @ApiProperty({ default: 'admin02' })
  @IsString()
  username: string;
}
