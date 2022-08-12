import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
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
      .getOneOrFail();
  }

  static async generatePasswordHash(
    password: string,
    salt: string,
  ): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      salt: Buffer.from(salt),
    });
  }

  static generateSalt(): string {
    const hashAsBytes = crypto.randomBytes(16);
    return hashAsBytes.toString('base64');
  }

  static async validateIfUserExistWithTheSameUsername(username: string) {
    const user = await User.findOneBy({ username: username });

    if (user)
      throw new HttpException(
        {
          message: 'user with the same username already exists',
          errors: {
            username: ['user with the same username already exists'],
          },
        },
        HttpStatus.BAD_REQUEST,
      );
  }

  static async validateIfUserExistWithTheSameEmail(email: string) {
    const user = await User.findOneBy({ email: email });

    if (user)
      throw new HttpException(
        {
          message: 'user with the same email address already exists',
          errors: {
            email: ['user with the same email address already exists'],
          },
        },
        HttpStatus.BAD_REQUEST,
      );
  }
}
