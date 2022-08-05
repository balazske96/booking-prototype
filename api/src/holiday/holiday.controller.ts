import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';

@Controller('holiday')
export class HolidayController {
  @Get()
  async findAll() {
    const holdays = await Holiday.find();

    return {
      message: 'ok',
      data: holdays,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const holiday = await Holiday.findOneBy({ id: id });

    if (!holiday)
      throw new NotFoundException('holiday with the specified id not found');

    return {
      message: 'ok',
      data: holiday,
    };
  }

  @Post()
  async create(@Body() createHoliday: CreateHolidayDto) {
    const newHoliday = new Holiday();
    newHoliday.comment = createHoliday.comment;
    newHoliday.startDate = createHoliday.startDate;
    newHoliday.startTime = createHoliday.startTime;
    newHoliday.endDate = createHoliday.endDate;
    newHoliday.endTime = createHoliday.endTime;
    await newHoliday.save();

    return {
      message: 'ok',
      data: newHoliday,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHoliday: UpdateHolidayDto,
  ) {
    const holiday = await Holiday.findOneBy({ id: id });

    if (!holiday)
      throw new NotFoundException('holiday with the specified id not found');

    holiday.comment = updateHoliday.comment;
    holiday.startDate = updateHoliday.startDate;
    holiday.startTime = updateHoliday.startTime;
    holiday.endDate = updateHoliday.endDate;
    holiday.endTime = updateHoliday.endTime;
    await holiday.save();

    return {
      message: 'ok',
      data: holiday,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const holiday = await Holiday.findOneBy({ id: id });

    if (!holiday)
      throw new NotFoundException('holiday with the specified id not found');

    await holiday.remove();

    return {
      message: 'ok',
    };
  }
}
