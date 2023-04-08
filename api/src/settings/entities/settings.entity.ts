import { NotFoundException } from '@nestjs/common';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Settings extends BaseEntity {
  @PrimaryColumn({ type: 'tinyint' })
  id: number;

  @Column('time', { name: 'monday_start' })
  mondayStart: string;

  @Column('time', { name: 'tuesday_start' })
  tuesdayStart: string;

  @Column('time', { name: 'wednesday_start' })
  wednesdayStart: string;

  @Column('time', { name: 'thurday_start' })
  thursdayStart: string;

  @Column('time', { name: 'friday_start' })
  fridayStart: string;

  @Column('time', { name: 'saturday_start' })
  saturdayStart: string;

  @Column('time', { name: 'sunday_start' })
  sundayStart: string;

  @Column('time', { name: 'monday_end' })
  mondayEnd: string;

  @Column('time', { name: 'tuesday_end' })
  tuesdayEnd: string;

  @Column('time', { name: 'wednesday_end' })
  wednesdayEnd: string;

  @Column('time', { name: 'thurday_end' })
  thursdayEnd: string;

  @Column('time', { name: 'friday_end' })
  fridayEnd: string;

  @Column('time', { name: 'saturday_end' })
  saturdayEnd: string;

  @Column('time', { name: 'sunday_end' })
  sundayEnd: string;

  static async getSettings(): Promise<Settings> {
    const settings = await Settings.findOneBy({ id: 1 });
    if (!settings) throw new NotFoundException('settings not found');

    return settings;
  }
}
