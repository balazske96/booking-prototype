import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { ServiceModule } from 'src/service/service.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [ServiceModule, EmailModule],
  controllers: [BookingController],
  providers: [],
})
export class BookingModule {}
