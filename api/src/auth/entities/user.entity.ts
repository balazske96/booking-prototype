import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, unique: true })
  username: string;

  @Column('varchar', { length: 320, unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { name: 'refresh_token', length: 1000, nullable: true })
  refreshToken: string;

  @Exclude()
  @Column('varchar', { length: 300, name: 'password_hash', nullable: true })
  passwordHash: string;

  @Exclude()
  @Column('varchar', { length: 128, name: 'password_salt' })
  passwordSalt: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  static async getUserByIdentifier(identifier: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.username = :identifier', { identifier: identifier })
      .orWhere('user.email = :identifier', { identifier: identifier })
      .getOne();
  }

  static async getById(id: string) {
    const user = await User.findOneBy({ id });

    if (!user)
      throw new HttpException(
        {
          message: 'not found',
          data: { errors: { id: ['user with the given user id not found'] } },
        },
        HttpStatus.NOT_FOUND,
      );

    return user;
  }
}
