import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreateTable1660217087318 implements MigrationInterface {
  name = 'InitialState1660217087320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`user\` (id, username, email, password_hash, password_salt) VALUES ('aa14d8cb-08ce-4c3a-8e96-00860b2de264','admin', 'admin@admin.com', '$argon2id$v=19$m=4096,t=3,p=1$WmFaeHg1MWg0aVBXc3RGU0krUTN2dz09$VcEhgwxGGbTknariVFuZO/eUkIEJEGeXK2sRg+egPQI', 'ZaZxx51h4iPWstFSI+Q3vw==');`,
    );
    await queryRunner.query(
      `INSERT INTO \`settings\` (id, monday_start, tuesday_start, wednesday_start, thurday_start, friday_start, saturday_start, sunday_start, monday_end, tuesday_end, wednesday_end, thurday_end, friday_end, saturday_end, sunday_end) VALUES (1, '08:00:00', '08:00:00', '08:00:00', '08:00:00', '08:00:00', '00:00:00', '00:00:00', '16:00:00', '16:00:00', '16:00:00', '16:00:00', '16:00:00', '00:00:00', '00:00:00');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`user\` WHERE username = 'admin'`);
    await queryRunner.query(`DELETE FROM \`settings\` WHERE id = 1`);
  }
}
