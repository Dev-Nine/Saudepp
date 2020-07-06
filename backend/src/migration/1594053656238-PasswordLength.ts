import {MigrationInterface, QueryRunner} from "typeorm";

export class PasswordLength1594053656238 implements MigrationInterface {
    name = 'PasswordLength1594053656238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(72) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(8000) NOT NULL`, undefined);
    }

}
