import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeNullableImage1594314356071 implements MigrationInterface {
    name = 'NoticeNullableImage1594314356071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "imageId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "imageType" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "deleteHash" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "deleteHash" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "imageType" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "imageId" SET NOT NULL`, undefined);
    }

}
