import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ default: 'adminNew' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty({ default: 'adminNew@admin.com' })
  @IsOptional()
  @IsString()
  @MaxLength(320)
  email: string;

  @ApiProperty({ default: 'NewPassword1234!' })
  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,32}$/,
    {
      message:
        'The new password must contain at least one lowercase and one uppercase letter, a special character (@$!%*?&), be at least 16 characters long and up to 32 characters long',
    },
  )
  newPassword: string;
}
