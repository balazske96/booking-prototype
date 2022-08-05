import { MigrationInterface, QueryRunner } from 'typeorm';

export class SettingsTable1659692940059 implements MigrationInterface {
  name = 'SettingsTable1659692940059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`settings\` (\`id\` tinyint NOT NULL, \`monday_start\` time NOT NULL, \`tuesday_start\` time NOT NULL, \`wednesday_start\` time NOT NULL, \`thurday_start\` time NOT NULL, \`friday_start\` time NOT NULL, \`saturday_start\` time NOT NULL, \`sunday_start\` time NOT NULL, \`monday_end\` time NOT NULL, \`tuesday_end\` time NOT NULL, \`wednesday_end\` time NOT NULL, \`thurday_end\` time NOT NULL, \`friday_end\` time NOT NULL, \`saturday_end\` time NOT NULL, \`sunday_end\` time NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`settings\``);
  }
}
