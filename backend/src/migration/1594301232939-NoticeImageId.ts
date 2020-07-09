import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeImageId1594301232939 implements MigrationInterface {
    name = 'NoticeImageId1594301232939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ADD "imageId" character varying(8) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "imageId"`, undefined);
    }

}
