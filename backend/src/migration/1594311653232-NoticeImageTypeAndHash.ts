import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeImageTypeAndHash1594311653232 implements MigrationInterface {
    name = 'NoticeImageTypeAndHash1594311653232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ADD "imageType" character varying(5) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "deleteHash" character varying(16) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "deleteHash"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "imageType"`, undefined);
    }

}
