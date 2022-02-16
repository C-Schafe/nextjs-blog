import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComments1644920865945 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          generationStrategy: 'increment',
          isPrimary: true
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'userId',
          type: 'int',
        },
        {
          name: 'postId',
          type: 'int',
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
    return await queryRunner.dropTable('comments');
  }

}
