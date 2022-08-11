import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenRefreshDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
