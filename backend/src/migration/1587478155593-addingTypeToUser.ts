import {MigrationInterface, QueryRunner} from "typeorm";

export class addingTypeToUser1587478155593 implements MigrationInterface {
    name = 'addingTypeToUser1587478155593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "type" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`, undefined);
    }

}
