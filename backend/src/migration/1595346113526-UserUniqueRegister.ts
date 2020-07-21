import {MigrationInterface, QueryRunner} from "typeorm";

export class UserUniqueRegister1595346113526 implements MigrationInterface {
    name = 'UserUniqueRegister1595346113526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c9a4ac4a84258b16efab69258a5" UNIQUE ("registerType", "registerState", "register")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c9a4ac4a84258b16efab69258a5"`, undefined);
    }

}
