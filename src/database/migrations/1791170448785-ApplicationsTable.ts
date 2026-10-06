import { MigrationInterface, QueryRunner } from 'typeorm';

export class ApplicationsTable1791170448785 implements MigrationInterface {
  name = 'ApplicationsTable1791170448785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP COLUMN "description"`,
    );
  }
}
