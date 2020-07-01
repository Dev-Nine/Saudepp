import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTitleTag1593618601145 implements MigrationInterface {
    name = 'AddTitleTag1593618601145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "title" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531" UNIQUE ("title")`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "FK_88415e12a223edce017506fdc3f"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD "id" SERIAL NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "PK_ca472fa482b939a79e1c185614f"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "PK_f6b82d8c4e917bac0c993eb926f" PRIMARY KEY ("noticeId")`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_88415e12a223edce017506fdc3"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP COLUMN "tagId"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD "tagId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "PK_f6b82d8c4e917bac0c993eb926f"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "PK_ca472fa482b939a79e1c185614f" PRIMARY KEY ("noticeId", "tagId")`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_88415e12a223edce017506fdc3" ON "tag_notice" ("tagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "FK_88415e12a223edce017506fdc3f" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "FK_88415e12a223edce017506fdc3f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_88415e12a223edce017506fdc3"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "PK_ca472fa482b939a79e1c185614f"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "PK_f6b82d8c4e917bac0c993eb926f" PRIMARY KEY ("noticeId")`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP COLUMN "tagId"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD "tagId" character varying NOT NULL`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_88415e12a223edce017506fdc3" ON "tag_notice" ("tagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "PK_f6b82d8c4e917bac0c993eb926f"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "PK_ca472fa482b939a79e1c185614f" PRIMARY KEY ("noticeId", "tagId")`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD "id" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "FK_88415e12a223edce017506fdc3f" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "title"`, undefined);
    }

}
