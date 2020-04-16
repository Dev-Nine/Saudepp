import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1586967948173 implements MigrationInterface {
    name = 'Test1586967948173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "sub_tag" ("id" character varying NOT NULL, "description" character varying NOT NULL, "tagId" character varying, CONSTRAINT "PK_f3808b5e482272984a0a1ae2f6b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tag" ("id" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "notice" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "abstract" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "text" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_705062b14410ff1a04998f86d72" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "noticeId" integer, "authorId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "sub_tag" ADD CONSTRAINT "FK_e275ba6f29fe5494289d0bbf327" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD CONSTRAINT "FK_d0d4b8dac89a99634b7e1fde052" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_02184cee9b85295f6ac887d120c" FOREIGN KEY ("noticeId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_02184cee9b85295f6ac887d120c"`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" DROP CONSTRAINT "FK_d0d4b8dac89a99634b7e1fde052"`, undefined);
        await queryRunner.query(`ALTER TABLE "sub_tag" DROP CONSTRAINT "FK_e275ba6f29fe5494289d0bbf327"`, undefined);
        await queryRunner.query(`DROP TABLE "comment"`, undefined);
        await queryRunner.query(`DROP TABLE "notice"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "sub_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
