import {MigrationInterface, QueryRunner} from "typeorm";

export class TagUniqueDescription1594043714560 implements MigrationInterface {
    name = 'TagUniqueDescription1594043714560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_6351d651f2af2f6a558ddfae9c1" UNIQUE ("description")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_6351d651f2af2f6a558ddfae9c1"`, undefined);
    }

}
