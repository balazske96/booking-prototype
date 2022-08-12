import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtTokenService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserCredentials(
    identifier: string,
    password: string,
  ): Promise<void> {
    const user = await User.getUserByIdentifier(identifier);

    if (!user) throw new UnauthorizedException('invalid credentials');

    this.validatePasswordForUser(user, password);
  }

  async validatePasswordForUser(user: User, password: string) {
    const passwordIsCorrect = await argon2.verify(user.passwordHash, password, {
      salt: Buffer.from(user.passwordSalt),
      type: argon2.argon2id,
    });

    if (!passwordIsCorrect)
      throw new UnauthorizedException('invalid credentials');
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

  generateVerificationLinkForUser(user: User): string {
    // TODO: reimagine the flow. Acces_token is not good because it gives access to other endpoints even if the username is not provided in the token
    const userInToken = { ...user, username: '' } as User;
    const token = this.generateAccessTokenForUser(userInToken);
    const clientAppUrl = this.configService.get<string>('CLIENT_APP_URL');

    return `${clientAppUrl}?token=${token}`;
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
