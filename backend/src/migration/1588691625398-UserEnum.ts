import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEnum1588691625398 implements MigrationInterface {
    name = 'UserEnum1588691625398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`CREATE TYPE "user_type_enum" AS ENUM('0', '1', '2', '3')`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" "user_type_enum" NOT NULL DEFAULT '3'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`DROP TYPE "user_type_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" integer NOT NULL`, undefined);
    }

}
