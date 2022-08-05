import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingModule } from './booking/booking.module';
import { ServiceModule } from './service/service.module';
import { SettingsModule } from './settings/settings.module';
import { HolidayModule } from './holiday/holiday.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['**/*.entity{.ts,.js}'],
      }),
    }),
    HolidayModule,
    BookingModule,
    ServiceModule,
    SettingsModule,
    AuthModule,
  ],
})
export class AppModule {}
