import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  LoggerService,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastructure/jwt.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings } from './entities/settings.entity';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async updateSettings(@Body() updateSettings: UpdateSettingsDto, @Req() req) {
    const settings = await Settings.getSettings();
    settings.mondayStart = updateSettings.mondayStart;
    settings.mondayEnd = updateSettings.mondayEnd;
    settings.tuesdayStart = updateSettings.tuesdayStart;
    settings.tuesdayEnd = updateSettings.tuesdayEnd;
    settings.wednesdayStart = updateSettings.wednesdayStart;
    settings.wednesdayEnd = updateSettings.wednesdayEnd;
    settings.thursdayStart = updateSettings.thursdayStart;
    settings.thursdayEnd = updateSettings.thursdayEnd;
    settings.fridayStart = updateSettings.fridayStart;
    settings.fridayEnd = updateSettings.fridayEnd;
    settings.saturdayStart = updateSettings.saturdayStart;
    settings.saturdayEnd = updateSettings.saturdayEnd;
    settings.sundayStart = updateSettings.sundayStart;
    settings.sundayEnd = updateSettings.sundayEnd;
    await settings.save();

    this.logger.log({
      message: 'settings updated',
      settings: settings,
      userId: req.user.id,
    });

    return {
      message: 'ok',
      data: settings,
    };
  }

  @Get()
  async getSettings() {
    const settings = await Settings.getSettings();

    if (!settings) throw new InternalServerErrorException('settings not found');

    return {
      message: 'ok',
      data: settings,
    };
  }
}
