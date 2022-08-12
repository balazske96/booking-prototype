import {
  Column,
  Entity,
  BaseEntity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('verification_token')
export class VerificationToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 300 })
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
