import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePosts1644920859329 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'authorId',
          type: 'int',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'updatedAt',
          isNullable: false,
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'createdAt',
          isNullable: false,
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('posts');
  }

}
