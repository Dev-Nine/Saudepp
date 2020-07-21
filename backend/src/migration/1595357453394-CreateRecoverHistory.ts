import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRecoverHistory1595357453394 implements MigrationInterface {
    name = 'CreateRecoverHistory1595357453394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recover_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "email" character varying(50) NOT NULL, CONSTRAINT "PK_fad153e9f562d6eeb2d1d49852c" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recover_history"`, undefined);
    }

}
