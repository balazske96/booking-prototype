import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookindAndServiceTables1659621498550
  implements MigrationInterface
{
  name = 'CreateBookindAndServiceTables1659621498550';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`service\` (\`id\` varchar(36) NOT NULL, \`display_name\` varchar(100) NOT NULL, \`description\` varchar(300) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`booking\` (\`id\` varchar(36) NOT NULL, \`date\` datetime NOT NULL, \`comment\` varchar(200) NULL, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`status\` enum ('CREATED', 'APPROVED', 'CANCELED') NOT NULL DEFAULT 'CREATED', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`serviceId\` varchar(36) NULL, UNIQUE INDEX \`REL_e812cafb996fae4e9636ffe294\` (\`serviceId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_e812cafb996fae4e9636ffe294f\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_e812cafb996fae4e9636ffe294f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e812cafb996fae4e9636ffe294\` ON \`booking\``,
    );
    await queryRunner.query(`DROP TABLE \`booking\``);
    await queryRunner.query(`DROP TABLE \`service\``);
  }
}
