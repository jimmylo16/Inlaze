import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultLikesForPosts1709151581017 implements MigrationInterface {
    name = 'AddDefaultLikesForPosts1709151581017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "likes" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "likes" DROP DEFAULT`);
    }

}
