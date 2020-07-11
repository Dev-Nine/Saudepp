import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAvatarInfo1594488960931 implements MigrationInterface {
    name = 'UserAvatarInfo1594488960931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "imageId" character varying(8)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "imageType" character varying(5)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleteHash" character varying(16)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleteHash"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageType"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageId"`, undefined);
    }

}
