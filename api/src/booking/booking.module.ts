import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [BookingController],
  providers: [],
})
export class BookingModule {}
