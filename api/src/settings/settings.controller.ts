import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/infrastructure/jwt.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings } from './entities/settings.entity';

@Controller('settings')
export class SettingsController {
  @UseGuards(JwtAuthGuard)
  @Post()
  async updateSettings(@Body() updateSettings: UpdateSettingsDto) {
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
