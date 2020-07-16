import {MigrationInterface, QueryRunner} from "typeorm";

export class NoticeLongerTitleAbstract1594913030948 implements MigrationInterface {
    name = 'NoticeLongerTitleAbstract1594913030948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "title" TYPE character varying(100)`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "abstract" TYPE character varying(150)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "abstract" TYPE character varying(120)`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ALTER COLUMN "title" TYPE character varying(70)`, undefined);
    }

}
