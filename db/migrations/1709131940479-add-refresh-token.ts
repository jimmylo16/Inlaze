import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshToken1709131940479 implements MigrationInterface {
    name = 'AddRefreshToken1709131940479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
