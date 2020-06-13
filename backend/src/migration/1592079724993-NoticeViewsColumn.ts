import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeViewsColumn1592079724993 implements MigrationInterface {
    name = 'NoticeViewsColumn1592079724993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ADD "views" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "views"`, undefined);
    }

}
