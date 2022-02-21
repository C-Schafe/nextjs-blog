import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AddUniqueIndexToUsers1645429341980 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('users', new TableIndex({
      name: 'uniqueUsername',
      columnNames: ['username'],
      isUnique: true,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'uniqueUsername');
  }

}
