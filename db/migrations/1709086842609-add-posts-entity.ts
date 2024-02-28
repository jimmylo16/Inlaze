import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostsEntity1709086842609 implements MigrationInterface {
  name = 'AddPostsEntity1709086842609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" date, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "content" text NOT NULL, "likes" text NOT NULL, "userId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" SET NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
