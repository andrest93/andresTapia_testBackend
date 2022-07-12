import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrganizationTable1657632934797
  implements MigrationInterface
{
  public async up(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.createTable(
      new Table({
        name: 'organization',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'identity',
          },
          {
            name: 'name',
            length: '50',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.dropTable('organization');
  }
}
