import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationTokenTable1660338183451 implements MigrationInterface {
    name = 'VerificationTokenTable1660338183451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`verification_token\` (\`id\` varchar(36) NOT NULL, \`token\` varchar(300) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_ae0f0fa33db263f0eb1bc36a63\` (\`token\`), UNIQUE INDEX \`REL_0748c047a951e34c0b686bfadb\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`verification_token\` ADD CONSTRAINT \`FK_0748c047a951e34c0b686bfadb2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verification_token\` DROP FOREIGN KEY \`FK_0748c047a951e34c0b686bfadb2\``);
        await queryRunner.query(`DROP INDEX \`REL_0748c047a951e34c0b686bfadb\` ON \`verification_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae0f0fa33db263f0eb1bc36a63\` ON \`verification_token\``);
        await queryRunner.query(`DROP TABLE \`verification_token\``);
    }

}
