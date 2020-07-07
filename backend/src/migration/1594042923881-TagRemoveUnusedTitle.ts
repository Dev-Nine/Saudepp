import {MigrationInterface, QueryRunner} from "typeorm";

export class TagRemoveUnusedTitle1594042923881 implements MigrationInterface {
    name = 'TagRemoveUnusedTitle1594042923881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "title"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "title" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531" UNIQUE ("title")`, undefined);
    }

}
