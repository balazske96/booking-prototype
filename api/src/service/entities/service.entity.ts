import { Exclude } from 'class-transformer';
import { Booking } from '../../booking/entities/booking.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

@Entity('service')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'display_name', length: 100, unique: true })
  displayName: string;

  @Column('varchar', { name: 'description', length: 300 })
  description: string;

  @Column('smallint', { name: 'length_in_minutes' })
  lengthInMinutes: number;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Booking[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static async getById(id: string): Promise<Service> {
    const service = await Service.findOneBy({ id });

    if (!service)
      throw new HttpException(
        {
          message: 'not found',
          errors: {
            id: 'booking with the specified id not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );

    return service;
  }

  static async validateIfServiceExists(id: string) {
    const service = await Service.findOneBy({ id: id });

    if (!service)
      throw new NotFoundException('service with the specified id not found');
  }
}
