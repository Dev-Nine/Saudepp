import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeDataTypeText1594056268177 implements MigrationInterface {
    name = 'NoticeDataTypeText1594056268177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "text"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "text" text NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "text"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "text" character varying NOT NULL`, undefined);
    }

}
