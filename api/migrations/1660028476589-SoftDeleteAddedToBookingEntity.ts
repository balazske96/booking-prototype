import { MigrationInterface, QueryRunner } from "typeorm";

export class SoftDeleteAddedToBookingEntity1660028476589 implements MigrationInterface {
    name = 'SoftDeleteAddedToBookingEntity1660028476589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`deleted_at\``);
    }

}
