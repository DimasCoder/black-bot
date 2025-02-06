import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1738837004462 implements MigrationInterface {
  name = 'CreateUsersTable1738837004462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "firstName" CHARACTER VARYING(64) NOT NULL,
        "lastName" CHARACTER VARYING(64),
        "username" CHARACTER VARYING(32),
        "chatId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
