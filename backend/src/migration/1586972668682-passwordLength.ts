import {MigrationInterface, QueryRunner} from "typeorm";

export class passwordLength1586972668682 implements MigrationInterface {
    name = 'passwordLength1586972668682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(8000) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(50) NOT NULL`, undefined);
    }

}
