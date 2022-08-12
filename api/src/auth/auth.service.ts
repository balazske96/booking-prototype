import { VerificationToken } from './entities/verification-token.entity';
import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

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

  generateRandomString(length = 64) {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charLength = chars.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  async generateVerificationLinkForUser(user: User): Promise<string> {
    const tokenString = this.generateRandomString();
    const tokenEntity = new VerificationToken();
    tokenEntity.token = tokenString;
    tokenEntity.user = user;
    await tokenEntity.save();

    const clientAppUrl = this.configService.get<string>('CLIENT_APP_URL');

    return `${clientAppUrl}?token=${tokenString}`;
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

  async generatePasswordHash(password: string, salt: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      salt: Buffer.from(salt),
    });
  }

  generateSalt(): string {
    const hashAsBytes = crypto.randomBytes(16);
    return hashAsBytes.toString('base64');
  }

  async validateIfUserExistWithTheSameUsername(username: string) {
    const user = await User.findOneBy({ username: username });

    if (user)
      throw new HttpException(
        {
          message: 'user with the same username already exists',
          errors: {
            username: ['user with the same username already exists'],
          },
        },
        HttpStatus.BAD_REQUEST,
      );
  }

  async validateIfUserExistWithTheSameEmail(email: string) {
    const user = await User.findOneBy({ email: email });

    if (user)
      throw new HttpException(
        {
          message: 'user with the same email address already exists',
          errors: {
            email: ['user with the same email address already exists'],
          },
        },
        HttpStatus.BAD_REQUEST,
      );
  }
}
