import {MigrationInterface, QueryRunner} from "typeorm";

export class covidInfo21590517688085 implements MigrationInterface {
    name = 'covidInfo21590517688085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "contagion_news" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "recupered" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ADD "deaths_news" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ALTER COLUMN "contagion" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ALTER COLUMN "deaths" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ALTER COLUMN "letality" SET DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" ALTER COLUMN "letality" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ALTER COLUMN "deaths" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" ALTER COLUMN "contagion" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "deaths_news"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "recupered"`, undefined);
        await queryRunner.query(`ALTER TABLE "covid_info" DROP COLUMN "contagion_news"`, undefined);
    }

}
