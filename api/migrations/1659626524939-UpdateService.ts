import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateService1659626524939 implements MigrationInterface {
  name = 'UpdateService1659626524939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD \`email\` varchar(320) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`service\` ADD UNIQUE INDEX \`IDX_0e6c3af2fdcaf32ba1d3c55609\` (\`display_name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`service\` DROP INDEX \`IDX_0e6c3af2fdcaf32ba1d3c55609\``,
    );
    await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`email\``);
  }
}
