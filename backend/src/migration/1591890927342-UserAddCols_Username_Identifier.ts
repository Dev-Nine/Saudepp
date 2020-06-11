import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAddColsUsernameIdentifier1591890927342 implements MigrationInterface {
    name = 'UserAddColsUsernameIdentifier1591890927342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(20) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "identifierType" character varying NOT NULL DEFAULT 'cpf'`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "identifier" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "identifier"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "identifierType"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`, undefined);
    }

}
