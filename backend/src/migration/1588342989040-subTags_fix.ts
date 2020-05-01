import {MigrationInterface, QueryRunner} from "typeorm";

export class subTagsFix1588342989040 implements MigrationInterface {
    name = 'subTagsFix1588342989040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subtag_notice" ("noticeId" integer NOT NULL, "subTagId" character varying NOT NULL, CONSTRAINT "PK_2e096a076c8ecb267e45ccb8943" PRIMARY KEY ("noticeId", "subTagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_11ccc2f5782e31ec2c6d9e92fa" ON "subtag_notice" ("noticeId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2c3111578cd24c47bc8f0d5b08" ON "subtag_notice" ("subTagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD "group" boolean NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "subtag_notice" ADD CONSTRAINT "FK_11ccc2f5782e31ec2c6d9e92fa9" FOREIGN KEY ("noticeId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subtag_notice" ADD CONSTRAINT "FK_2c3111578cd24c47bc8f0d5b087" FOREIGN KEY ("subTagId") REFERENCES "sub_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtag_notice" DROP CONSTRAINT "FK_2c3111578cd24c47bc8f0d5b087"`, undefined);
        await queryRunner.query(`ALTER TABLE "subtag_notice" DROP CONSTRAINT "FK_11ccc2f5782e31ec2c6d9e92fa9"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "group"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2c3111578cd24c47bc8f0d5b08"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_11ccc2f5782e31ec2c6d9e92fa"`, undefined);
        await queryRunner.query(`DROP TABLE "subtag_notice"`, undefined);
    }

}
