import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeTitleAndAbstractLimit1593433628036 implements MigrationInterface {
    name = 'NoticeTitleAndAbstractLimit1593433628036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "title"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "title" character varying(70) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "abstract"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "abstract" character varying(120) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "abstract"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "abstract" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" DROP COLUMN "title"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD "title" character varying NOT NULL`, undefined);
    }

}
