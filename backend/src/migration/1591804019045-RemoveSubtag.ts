import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveSubtag1591804019045 implements MigrationInterface {
    name = 'RemoveSubtag1591804019045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "group"`, undefined);
        await queryRunner.query(`ALTER TYPE "public"."user_type_enum" RENAME TO "user_type_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "user_type_enum" AS ENUM('0', '2')`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" TYPE "user_type_enum" USING "type"::"text"::"user_type_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" SET DEFAULT '2'`, undefined);
        await queryRunner.query(`DROP TYPE "user_type_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" SET DEFAULT '2'`, undefined);

        await queryRunner.query(`ALTER TABLE "subtag_notice" DROP CONSTRAINT "FK_2c3111578cd24c47bc8f0d5b087"`, undefined);
        await queryRunner.query(`ALTER TABLE "subtag_notice" DROP CONSTRAINT "FK_11ccc2f5782e31ec2c6d9e92fa9"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2c3111578cd24c47bc8f0d5b08"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_11ccc2f5782e31ec2c6d9e92fa"`, undefined);
        await queryRunner.query(`DROP TABLE "subtag_notice"`, undefined);

        await queryRunner.query(`ALTER TABLE "sub_tag" DROP CONSTRAINT "FK_e275ba6f29fe5494289d0bbf327"`, undefined);
        await queryRunner.query(`DROP TABLE "sub_tag"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_tag" ("id" character varying NOT NULL, "description" character varying NOT NULL, "tagId" character varying, CONSTRAINT "PK_f3808b5e482272984a0a1ae2f6b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "sub_tag" ADD CONSTRAINT "FK_e275ba6f29fe5494289d0bbf327" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        
        await queryRunner.query(`CREATE TABLE "subtag_notice" ("noticeId" integer NOT NULL, "subTagId" character varying NOT NULL, CONSTRAINT "PK_2e096a076c8ecb267e45ccb8943" PRIMARY KEY ("noticeId", "subTagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_11ccc2f5782e31ec2c6d9e92fa" ON "subtag_notice" ("noticeId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2c3111578cd24c47bc8f0d5b08" ON "subtag_notice" ("subTagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "subtag_notice" ADD CONSTRAINT "FK_11ccc2f5782e31ec2c6d9e92fa9" FOREIGN KEY ("noticeId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subtag_notice" ADD CONSTRAINT "FK_2c3111578cd24c47bc8f0d5b087" FOREIGN KEY ("subTagId") REFERENCES "sub_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" SET DEFAULT '3'`, undefined);
        await queryRunner.query(`CREATE TYPE "user_type_enum_old" AS ENUM('0', '1', '2', '3')`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" TYPE "user_type_enum_old" USING "type"::"text"::"user_type_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "type" SET DEFAULT '2'`, undefined);
        await queryRunner.query(`DROP TYPE "user_type_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "user_type_enum_old" RENAME TO  "user_type_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD "group" boolean NOT NULL`, undefined);
    }

}
