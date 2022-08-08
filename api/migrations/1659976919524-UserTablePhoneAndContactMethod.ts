import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTablePhoneAndContactMethod1659976919524
  implements MigrationInterface
{
  name = 'UserTablePhoneAndContactMethod1659976919524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD \`contact_method\` enum ('EMAIL', 'PHONE') NOT NULL DEFAULT 'EMAIL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD \`phone\` varchar(100) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`phone\``);
    await queryRunner.query(
      `ALTER TABLE \`booking\` DROP COLUMN \`contact_method\``,
    );
  }
}
