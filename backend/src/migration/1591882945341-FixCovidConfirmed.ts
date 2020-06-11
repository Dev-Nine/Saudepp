import {MigrationInterface, QueryRunner} from "typeorm";

export class FixCovidConfirmed1591882945341 implements MigrationInterface {
    name = 'FixCovidConfirmed1591882945341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" RENAME COLUMN "cases" TO "confirmed"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" RENAME COLUMN "confirmed" TO "cases"`, undefined);
    }

}
