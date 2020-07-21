import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAddState1595338366461 implements MigrationInterface {
    name = 'UserAddState1595338366461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "identifierType" TO "registerType"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "identifier" TO "register"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "registerState" character varying(2)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerState"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "register" TO "identifier"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "registerType" TO "identifierType"`, undefined);
    }

}
