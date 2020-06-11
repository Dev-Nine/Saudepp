import {MigrationInterface, QueryRunner} from "typeorm";

export class CovidDateUnique1591884227411 implements MigrationInterface {
    name = 'CovidDateUnique1591884227411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" ADD CONSTRAINT "UQ_7618b20a3798c64ab3729808f60" UNIQUE ("date")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "covid_info" DROP CONSTRAINT "UQ_7618b20a3798c64ab3729808f60"`, undefined);
    }

}
