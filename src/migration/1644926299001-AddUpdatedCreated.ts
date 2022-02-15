import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUpdatedCreated1644926299001 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'createdAt',
      type: 'time',
      isNullable: false,
      default: 'now()',
    }));
    await queryRunner.addColumn('users', new TableColumn({
      name: 'updatedAt',
      type: 'time',
      isNullable: false,
      default: 'now()',
    }));
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'createdAt',
      type: 'time',
      isNullable: false,
      default: 'now()',
    }));
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'updatedAt',
      type: 'time',
      isNullable: false,
      default: 'now()',
    }));
    await queryRunner.addColumn('comments', new TableColumn({
      name: 'createdAt',
      type: 'time',
      isNullable: false,
      default: 'now()',
    }));
    return await queryRunner.addColumn('comments', new TableColumn({
      name: 'updatedAt ',
      type: 'time',
      isNullable: false,
      default: 'now()',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['createdAt', 'updatedAt']);
    await queryRunner.dropColumns('posts', ['createdAt', 'updatedAt']);
    return await queryRunner.dropColumns('comments', ['createdAt', 'updatedAt']);
  }

}
