import { Service } from '../../service/entities/service.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { BookingStatus } from './booking-status.enum';

@Entity('booking')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('datetime', { nullable: false, name: 'date' })
  date: string;

  @Column('varchar', { length: 200, name: 'comment', nullable: true })
  comment: string;

  @Column('varchar', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 100 })
  lastName: string;

  @Column('enum', {
    name: 'status',
    enum: BookingStatus,
    default: BookingStatus.CREATED,
  })
  status: BookingStatus;

  @OneToOne(() => Service)
  @JoinColumn()
  service: Service;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
