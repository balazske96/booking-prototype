import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreateTable1660201340998 implements MigrationInterface {
  name = 'InitialCreateTable1660201340998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(320) NOT NULL, \`refresh_token\` varchar(1000) NULL, \`password_hash\` varchar(300) NOT NULL, \`password_salt\` varchar(128) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`settings\` (\`id\` tinyint NOT NULL, \`monday_start\` time NOT NULL, \`tuesday_start\` time NOT NULL, \`wednesday_start\` time NOT NULL, \`thurday_start\` time NOT NULL, \`friday_start\` time NOT NULL, \`saturday_start\` time NOT NULL, \`sunday_start\` time NOT NULL, \`monday_end\` time NOT NULL, \`tuesday_end\` time NOT NULL, \`wednesday_end\` time NOT NULL, \`thurday_end\` time NOT NULL, \`friday_end\` time NOT NULL, \`saturday_end\` time NOT NULL, \`sunday_end\` time NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`booking\` (\`id\` varchar(36) NOT NULL, \`date\` date NOT NULL, \`time\` time NOT NULL, \`length_of_service_in_minutes\` smallint NOT NULL, \`email\` varchar(320) NOT NULL, \`phone\` varchar(100) NULL, \`comment\` varchar(200) NULL, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`status\` enum ('NEW', 'APPROVED', 'CANCELED') NOT NULL DEFAULT 'NEW', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`serviceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`service\` (\`id\` varchar(36) NOT NULL, \`display_name\` varchar(100) NOT NULL, \`description\` varchar(300) NOT NULL, \`length_in_minutes\` smallint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0e6c3af2fdcaf32ba1d3c55609\` (\`display_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`holiday\` (\`id\` varchar(36) NOT NULL, \`start_date\` date NOT NULL, \`start_time\` time NOT NULL, \`end_date\` date NOT NULL, \`end_time\` time NOT NULL, \`comment\` varchar(300) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_e812cafb996fae4e9636ffe294f\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_e812cafb996fae4e9636ffe294f\``,
    );
    await queryRunner.query(`DROP TABLE \`holiday\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0e6c3af2fdcaf32ba1d3c55609\` ON \`service\``,
    );
    await queryRunner.query(`DROP TABLE \`service\``);
    await queryRunner.query(`DROP TABLE \`booking\``);
    await queryRunner.query(`DROP TABLE \`settings\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
