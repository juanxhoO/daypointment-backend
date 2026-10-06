import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApplicationTable1790712697284 implements MigrationInterface {
  name = 'CreateApplicationTable1790712697284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "UQ_fcdfc51648dfbc8cfa417d6c3fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "UQ_fcdfc51648dfbc8cfa417d6c3fc" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "userId"`);
  }
}
