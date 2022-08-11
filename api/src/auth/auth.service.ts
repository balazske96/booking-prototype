import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private jwtTokenService: JwtService) {}

  async validateUserCredentials(
    identifier: string,
    password: string,
  ): Promise<void> {
    const user = await User.getUserByIdentifier(identifier);

    if (!user)
      throw new UnauthorizedException('username, email or password is wrong');

    const passwordIsCorrect = await argon2.verify(user.passwordHash, password, {
      salt: Buffer.from(user.passwordSalt),
      type: argon2.argon2id,
    });

    if (!passwordIsCorrect)
      throw new UnauthorizedException('username, email or password is wrong');
  }

  generateRefreshToken(user: User) {
    const payload = {
      sub: user.id,
    };

    return this.jwtTokenService.sign(payload, { expiresIn: 1209600 });
  }

  generateAccessTokenForUser(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };

    return this.jwtTokenService.sign(payload);
  }

  validateRefreshToken(token: string) {
    try {
      this.jwtTokenService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('invalid refresh token');
    }
  }

  getPayloadFromToken(token: string) {
    return this.jwtTokenService.decode(token);
  }
}
