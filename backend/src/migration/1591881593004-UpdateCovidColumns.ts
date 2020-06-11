import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCovidColumns1591881593004 implements MigrationInterface {
    name = 'UpdateCovidColumns1591881593004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "contagion"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "letality"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "contagion_news"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "recupered"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "deaths_news"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "cases" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "recovered" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "lethality" character varying NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "lethality"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "recovered"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "cases"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "deaths_news" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "recupered" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "contagion_news" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "letality" character varying NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "contagion" integer NOT NULL DEFAULT 0`, undefined);
    }

}
