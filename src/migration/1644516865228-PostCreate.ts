import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PostCreate1644516865228 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          generationStrategy: 'increment',
          isPrimary: true,
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'content',
          type: 'text',
        }
      ]
    });
    return await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('posts');
  }

}
