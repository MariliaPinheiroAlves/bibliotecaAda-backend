import { MigrationInterface, QueryRunner } from "typeorm";

export class BookTable1732326623101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`) //garantir que não haverá erros com o id do tipo uuuid
        await queryRunner.query(
            `CREATE TABLE book (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                title varchar(256) NOT NULL,
                author varchar(256) NOT NULL,
                description varchar(1280) NOT NULL,
                photo_url varchar(256) NULL,
                available boolean NOT NULL DEFAULT true,
                CONSTRAINT books_pk_id PRIMARY KEY (id)
            );`
        )
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS book;`);
    };

}
