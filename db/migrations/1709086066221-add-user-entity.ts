import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntity1709086066221 implements MigrationInterface {
  name = 'AddUserEntity1709086066221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" date NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" text NOT NULL, "age" integer NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
