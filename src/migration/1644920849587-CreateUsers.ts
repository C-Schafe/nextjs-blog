import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1644920849587 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {name: 'id', type: 'int', isPrimary: true,isGenerated: true, generationStrategy: 'increment'},
        {name: 'username',type: 'varchar'},
        {name: 'passwordDigest', type: 'varchar'},
        {name: 'updatedAt', isNullable: false, type: 'timestamp', default: 'now()'},
        {name: 'createdAt', isNullable: false, type: 'timestamp', default: 'now()'}
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users');
  }

}
