import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinTableTagNotice1587042084166 implements MigrationInterface {
    name = 'JoinTableTagNotice1587042084166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_notice" ("noticeId" integer NOT NULL, "tagId" character varying NOT NULL, CONSTRAINT "PK_ca472fa482b939a79e1c185614f" PRIMARY KEY ("noticeId", "tagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f6b82d8c4e917bac0c993eb926" ON "tag_notice" ("noticeId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_88415e12a223edce017506fdc3" ON "tag_notice" ("tagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "FK_f6b82d8c4e917bac0c993eb926f" FOREIGN KEY ("noticeId") REFERENCES "notice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" ADD CONSTRAINT "FK_88415e12a223edce017506fdc3f" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "FK_88415e12a223edce017506fdc3f"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_notice" DROP CONSTRAINT "FK_f6b82d8c4e917bac0c993eb926f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_88415e12a223edce017506fdc3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f6b82d8c4e917bac0c993eb926"`, undefined);
        await queryRunner.query(`DROP TABLE "tag_notice"`, undefined);
    }

}
