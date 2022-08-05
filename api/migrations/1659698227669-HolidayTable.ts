import { MigrationInterface, QueryRunner } from "typeorm";

export class HolidayTable1659698227669 implements MigrationInterface {
    name = 'HolidayTable1659698227669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`holiday\` (\`id\` varchar(36) NOT NULL, \`start_date\` date NOT NULL, \`start_time\` time NOT NULL, \`end_date\` date NOT NULL, \`end_time\` time NOT NULL, \`comment\` varchar(300) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`holiday\``);
    }

}
