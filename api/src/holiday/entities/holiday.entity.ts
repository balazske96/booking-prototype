import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('holiday')
export class Holiday extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date', { name: 'start_date' })
  startDate: string;

  @Column('time', { name: 'start_time' })
  startTime: string;

  @Column('date', { name: 'end_date' })
  endDate: string;

  @Column('time', { name: 'end_time' })
  endTime: string;

  @Column('varchar', { name: 'comment', length: 300, nullable: true })
  comment: string;
}
