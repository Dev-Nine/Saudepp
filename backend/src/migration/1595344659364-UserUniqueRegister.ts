import {MigrationInterface, QueryRunner} from "typeorm";

export class UserUniqueRegister1595344659364 implements MigrationInterface {
    name = 'UserUniqueRegister1595344659364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_1890a95a3c19f3161c3b63df8f3" UNIQUE ("register")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_1890a95a3c19f3161c3b63df8f3"`, undefined);
    }

}
