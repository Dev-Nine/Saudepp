import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentUser1588695059712 implements MigrationInterface {
    name = 'CommentUser1588695059712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "authorId" TO "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "userId" TO "authorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
