import { AuthService } from './../auth.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  LoggerService,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { User } from '../entities/user.entity';

/**
 * This guard prevents from sending a request without checking the password of the logged-in user
 */
@Injectable()
export class PasswordGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.body;
    const user: { id: string; username: string; email: string } = request.user;

    /**
     * Validate if the user is included in the request object.
     * This can happen if we use some user resolver guard before this guard (for this application JwtAuthGuard).
     */
    if (!user) {
      this.logger.log(
        'user not provided for the request object (token is missing)',
      );
      throw new UnauthorizedException('invalid credentials');
    }

    /**
     * Validate if the user from the access_token exists at all and the user provided password
     * for this request is valid for that user.
     */
    const actualUser = await User.findOneBy({ id: user.id });

    if (!actualUser) {
      this.logger.log(`user with the specified id: '${user.id}' not found`);
      throw new UnauthorizedException('invalid credentials');
    }

    /**
     * Validate the password
     */
    const password = payload['guard_password'] ?? '';
    this.authService.validatePasswordForUser(actualUser, password);

    /**
     * Every validation passed
     */
    return true;
  }
}
