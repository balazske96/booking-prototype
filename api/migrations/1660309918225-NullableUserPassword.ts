import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableUserPassword1660309918225 implements MigrationInterface {
  name = 'NullableUserPassword1660309918225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password_hash\` \`password_hash\` varchar(300) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password_hash\` \`password_hash\` varchar(300) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password_hash\` \`password_hash\` varchar(300) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password_hash\` \`password_hash\` varchar(300) NOT NULL`,
    );
  }
}
