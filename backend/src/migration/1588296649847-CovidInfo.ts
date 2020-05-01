import {MigrationInterface, QueryRunner} from "typeorm";

export class CovidInfo1588296649847 implements MigrationInterface {
    name = 'CovidInfo1588296649847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "covid_info" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "contagion" integer NOT NULL, "deaths" integer NOT NULL, "letality" character varying NOT NULL, CONSTRAINT "PK_7b67463c8fda429346f1a3667e5" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "covid_info"`, undefined);
    }

}
