import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeImageIdNewApi1594992026495 implements MigrationInterface {
    name = 'ChangeImageIdNewApi1594992026495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleteHash"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "deleteHash"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "imageId" TYPE character varying(25)`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "imageId" TYPE character varying(25)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "imageId" TYPE character varying(8)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "imageId" TYPE character varying(8)`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "deleteHash" character varying(16)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleteHash" character varying(16)`, undefined);
    }

}
