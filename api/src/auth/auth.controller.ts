import { UpdateProfileDto } from './dto/update-profile.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UnauthorizedException,
  Inject,
  LoggerService,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './infrastructure/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PasswordGuard } from './infrastructure/password.guard';
import { EmailService } from 'src/email/email.service';
import { UserVerifyLink } from 'src/email/infrastructure/user-verify-link.mail';
import { VerificationTokenDto } from './dto/validate-verification-token.dto';
import { VerificationToken } from './entities/verification-token.entity';
import { CreatePasswordDto } from './dto/create-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserInfo(@Req() req) {
    return req.user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() login: LoginDto) {
    const identifier = login.identifier;
    await this.authService.validateUserCredentials(identifier, login.password);

    const user = await User.getUserByIdentifier(identifier);
    const accessToken = this.authService.generateAccessTokenForUser(user);
    const refreshToken = this.authService.generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return {
      message: 'ok',
      data: {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  @Post('token-refresh')
  async refreshToken(@Body() tokenRefresh: TokenRefreshDto) {
    const refreshToken = tokenRefresh.refreshToken;
    this.authService.validateRefreshToken(refreshToken);
    const tokenPayload = this.authService.getPayloadFromToken(refreshToken);
    const userId = tokenPayload['id'];
    const user = await User.findOneBy({ id: userId });

    if (user.refreshToken !== refreshToken)
      throw new UnauthorizedException('invalid refresh token');

    const newAccessToken = this.authService.generateAccessTokenForUser(user);
    const newRefreshToken = this.authService.generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    return {
      message: 'ok',
      data: {
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PasswordGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('registrate')
  async registerUser(@Body() register: RegisterUserDto, @Req() req) {
    await this.authService.validateIfUserExistWithTheSameEmail(register.email);
    await this.authService.validateIfUserExistWithTheSameUsername(
      register.username,
    );

    const passwordSalt = this.authService.generateSalt();

    const user = new User();
    user.passwordSalt = passwordSalt;
    user.email = register.email;
    user.username = register.username;
    await user.save();

    const verificationLink =
      await this.authService.generateVerificationLinkForUser(user);
    const verificationMail = new UserVerifyLink(user, verificationLink);
    await this.emailService.sendMailable(verificationMail);

    const refreshToken = this.authService.generateRefreshToken(user);
    user.refreshToken = refreshToken;
    user.save();

    this.logger.log({
      message: 'new user registered',
      user: user,
      userId: req.user.id,
    });

    return {
      message: 'ok',
      data: user,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PasswordGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('update-profile')
  async updateUserProfil(@Body() updateProfileDto: UpdateProfileDto) {
    // TODO: implement update user profil endpoint
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('verification-token')
  async validateVerificationToken(
    @Query() verificationToken: VerificationTokenDto,
  ) {
    const token = await VerificationToken.findOneBy({
      token: verificationToken.token,
    });

    if (!token) throw new UnauthorizedException();

    return {
      message: 'ok',
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create-password')
  async createFirstPassword(
    @Body() createPasswordDto: CreatePasswordDto,
    @Query('token') token: string,
  ) {
    const username = createPasswordDto.username;
    const passoword = createPasswordDto.password;

    await this.authService.validateVerificationToken(username, token);

    const user = await User.findOneBy({ username });

    const passwordHash = await this.authService.generatePasswordHash(
      passoword,
      user.passwordSalt,
    );

    user.passwordHash = passwordHash;
    await user.save();

    await this.authService.sanitizeVerificationToken(token);

    return {
      message: 'ok',
    };
  }
}
